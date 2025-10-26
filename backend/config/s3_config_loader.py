import json
import logging
import os
import threading
from typing import Dict, Any, Optional
import boto3
from botocore.exceptions import ClientError, NoCredentialsError
from apscheduler.schedulers.background import BackgroundScheduler

logger = logging.getLogger(__name__)


class S3ConfigLoader:
    """
    Loads configuration from S3 and refreshes it periodically.
    Falls back to local config.json if S3 is unavailable.
    Thread-safe for concurrent access.
    """

    def __init__(
        self,
        bucket_name: Optional[str] = None,
        config_key: Optional[str] = None,
        refresh_interval_minutes: int = 5,
        fallback_path: str = "../config.json",
        region: Optional[str] = None,
    ):
        """
        Initialize the S3 config loader.

        Args:
            bucket_name: S3 bucket name (from env: S3_BUCKET)
            config_key: S3 object key (from env: S3_CONFIG_KEY)
            refresh_interval_minutes: How often to refresh config (from env: REFRESH_INTERVAL_MINUTES)
            fallback_path: Local config path if S3 fails
            region: AWS region (from env: AWS_REGION)
        """
        self.bucket_name = bucket_name or os.getenv("S3_BUCKET")
        self.config_key = config_key or os.getenv("S3_CONFIG_KEY", "config.json")
        self.refresh_interval = int(
            os.getenv("REFRESH_INTERVAL_MINUTES", str(refresh_interval_minutes))
        )
        self.fallback_path = fallback_path
        self.region = region or os.getenv("AWS_REGION", "us-east-1")

        # Thread-safe config storage
        self._config: Dict[str, Any] = {}
        self._lock = threading.Lock()

        # S3 client
        self._s3_client = None
        if self.bucket_name:
            try:
                # Build boto3 client kwargs
                client_kwargs = {"region_name": self.region}

                # Check for explicit AWS credentials in environment
                aws_access_key = os.getenv("AWS_ACCESS_KEY_ID")
                aws_secret_key = os.getenv("AWS_SECRET_ACCESS_KEY")
                aws_session_token = os.getenv("AWS_SESSION_TOKEN")

                if aws_access_key and aws_secret_key:
                    logger.info("Using AWS credentials from environment variables")
                    client_kwargs["aws_access_key_id"] = aws_access_key
                    client_kwargs["aws_secret_access_key"] = aws_secret_key
                    if aws_session_token:
                        client_kwargs["aws_session_token"] = aws_session_token
                        logger.info("Session token detected (temporary credentials)")
                else:
                    logger.info("Using default AWS credential chain (profile, IAM role, etc.)")

                self._s3_client = boto3.client("s3", **client_kwargs)
                logger.info(
                    f"S3 client initialized for bucket: {self.bucket_name}, key: {self.config_key}, region: {self.region}"
                )
            except Exception as e:
                logger.warning(f"Failed to initialize S3 client: {e}")

        # Scheduler for periodic refresh
        self._scheduler = BackgroundScheduler()

        # Initial load
        self._load_config()

        # Start periodic refresh if S3 is configured
        if self._s3_client and self.refresh_interval > 0:
            self._scheduler.add_job(
                self._load_config,
                "interval",
                minutes=self.refresh_interval,
                id="config_refresh",
                name="Refresh config from S3",
            )
            self._scheduler.start()
            logger.info(
                f"Config refresh scheduled every {self.refresh_interval} minutes"
            )

    def _load_from_s3(self) -> Optional[Dict[str, Any]]:
        """Load config from S3."""
        if not self._s3_client or not self.bucket_name:
            return None

        try:
            logger.info(f"Fetching config from S3: s3://{self.bucket_name}/{self.config_key}")
            response = self._s3_client.get_object(
                Bucket=self.bucket_name, Key=self.config_key
            )
            config_data = response["Body"].read().decode("utf-8")
            config = json.loads(config_data)
            logger.info("Successfully loaded config from S3")
            return config

        except ClientError as e:
            error_code = e.response.get("Error", {}).get("Code", "Unknown")
            logger.error(f"S3 ClientError ({error_code}): {e}")
            return None

        except NoCredentialsError:
            logger.error("AWS credentials not found")
            return None

        except json.JSONDecodeError as e:
            logger.error(f"Invalid JSON in S3 config: {e}")
            return None

        except Exception as e:
            logger.error(f"Unexpected error loading from S3: {e}")
            return None

    def _load_from_local(self) -> Optional[Dict[str, Any]]:
        """Load config from local file."""
        try:
            logger.info(f"Loading config from local file: {self.fallback_path}")
            with open(self.fallback_path, "r") as f:
                config = json.load(f)
            logger.info("Successfully loaded config from local file")
            return config

        except FileNotFoundError:
            logger.error(f"Local config file not found: {self.fallback_path}")
            return None

        except json.JSONDecodeError as e:
            logger.error(f"Invalid JSON in local config: {e}")
            return None

        except Exception as e:
            logger.error(f"Unexpected error loading local config: {e}")
            return None

    def _load_config(self):
        """
        Load config from S3, fall back to local file if S3 fails.
        Thread-safe update of internal config.
        """
        logger.info("Loading configuration...")

        # Try S3 first
        config = self._load_from_s3()

        # Fall back to local file
        if config is None:
            logger.warning("S3 load failed, falling back to local config")
            config = self._load_from_local()

        # Update internal config if we got valid data
        if config is not None:
            with self._lock:
                self._config = config
            logger.info("Configuration updated successfully")
        else:
            logger.error("Failed to load config from both S3 and local file")

    def get_config(self) -> Dict[str, Any]:
        """
        Get the current config (thread-safe).

        Returns:
            Dict containing the current configuration
        """
        with self._lock:
            return self._config.copy()

    def get_models(self) -> list:
        """
        Get all available models from config.

        Returns:
            List of model objects with their derivatives
        """
        config = self.get_config()
        # Config is now a list of models
        return config if isinstance(config, list) else []

    def get_model_by_id(self, model_id: str) -> Optional[Dict[str, Any]]:
        """
        Get a specific model by its ID.

        Args:
            model_id: ID of the model to look up

        Returns:
            Model dict or None if not found
        """
        models = self.get_models()
        for model in models:
            if model.get("id") == model_id:
                return model
        return None

    def shutdown(self):
        """Shutdown the scheduler gracefully."""
        if self._scheduler.running:
            self._scheduler.shutdown()
            logger.info("Config loader scheduler stopped")


# Global instance (initialized in app.py)
_config_loader_instance: Optional[S3ConfigLoader] = None


def init_config_loader(**kwargs) -> S3ConfigLoader:
    """
    Initialize the global config loader instance.

    Args:
        **kwargs: Arguments to pass to S3ConfigLoader constructor

    Returns:
        Initialized S3ConfigLoader instance
    """
    global _config_loader_instance
    _config_loader_instance = S3ConfigLoader(**kwargs)
    return _config_loader_instance


def get_config_loader() -> Optional[S3ConfigLoader]:
    """
    Get the global config loader instance.

    Returns:
        S3ConfigLoader instance or None if not initialized
    """
    return _config_loader_instance
