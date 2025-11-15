from typing import Any, Dict
from anthropic import Anthropic
from .config import get_settings
from .logger import logger

settings = get_settings()


def get_client() -> Anthropic:
    if not settings.anthropic_api_key:
        raise RuntimeError("ANTHROPIC_API_KEY is not set in environment or .env")
    return Anthropic(api_key=settings.anthropic_api_key)


def call_llm(prompt: str, system_prompt: str | None = None) -> str:
    """
    Universal Claude wrapper for backend.
    """
    client = get_client()

    logger.debug("=== LLM CALL START ===")
    logger.debug(f"System prompt:\n{system_prompt}")
    logger.debug(f"User prompt:\n{prompt}")

    response = client.messages.create(
        model=settings.anthropic_model,
        max_tokens=1500,
        system=system_prompt or "",
        messages=[{"role": "user", "content": prompt}],
        extra_headers={"anthropic-beta": "messages-2023-12-15"}
    )
    text = response.content[0].text
    logger.debug(f"LLM response:\n{text}")
    logger.debug("=== LLM CALL END ===")
    return text
