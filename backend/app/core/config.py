import os
from functools import lru_cache
from pydantic_settings import BaseSettings


class Settings(BaseSettings):
    app_name: str = "AI Sprint Copilot Backend"
    anthropic_api_key: str | None = None
    anthropic_model: str = "claude-3-5-haiku-20241022" #"claude-haiku-4-5-20251001"  # adjust as needed
    database_url: str = "sqlite:///./data.db"

    class Config:
        env_file = ".env"
        env_file_encoding = "utf-8"


@lru_cache
def get_settings() -> Settings:
    return Settings()
