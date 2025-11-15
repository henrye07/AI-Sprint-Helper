import json
import re


def extract_json(text: str):
    """
    Robust JSON extractor for LLM outputs.
    Ensures we can handle:
    - Extra commentary around the JSON
    - Markdown code blocks ```json ... ```
    - Trailing commas or whitespace
    - Newlines and escaped text
    """

    # 1. Try direct parse (ideal case)
    try:
        return json.loads(text)
    except json.JSONDecodeError:
        pass

    # 2. Extract JSON inside code block if present
    code_block = re.search(r"```json(.*?)```", text, re.DOTALL)
    if code_block:
        json_text = code_block.group(1).strip()
        try:
            return json.loads(json_text)
        except json.JSONDecodeError:
            pass

    # 3. Extract first {...} or [...] block in text
    json_match = re.search(r"(\{.*\}|\[.*\])", text, re.DOTALL)
    if json_match:
        try:
            return json.loads(json_match.group(1))
        except json.JSONDecodeError:
            pass

    # 4. Last resort — clean up trailing commas
    cleaned = re.sub(r",\s*}", "}", text)
    cleaned = re.sub(r",\s*]", "]", cleaned)

    try:
        return json.loads(cleaned)
    except json.JSONDecodeError:
        raise ValueError("LLM did not return valid JSON:\n" + text)
