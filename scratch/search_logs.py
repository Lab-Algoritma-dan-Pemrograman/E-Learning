import json

log_path = r"C:\Users\MyBook Hype AMD\.gemini\antigravity\brain\e336cf46-61d0-4260-abf3-31aea713f26d\.system_generated\logs\transcript.jsonl"
with open(log_path, "r", encoding="utf-8") as f:
    for line_num, line in enumerate(f, 1):
        if line_num == 205:
            try:
                obj = json.loads(line)
                print(json.dumps(obj.get('tool_calls'), indent=2))
            except Exception as e:
                print(f"Error: {e}")
