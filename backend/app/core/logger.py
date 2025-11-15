import logging
import os

LOG_LEVEL = os.getenv("LOG_LEVEL", "DEBUG").upper()

# Configure root logger
logging.basicConfig(
    level=LOG_LEVEL,
    format="%(asctime)s [%(levelname)s] %(name)s: %(message)s",
    handlers=[
        logging.StreamHandler(),
        logging.FileHandler("backend.log", mode="a", encoding="utf-8")
    ]
)

logger = logging.getLogger("backend")