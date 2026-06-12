import os
import sys

pdf_path = r"C:\Users\MyBook Hype AMD\Downloads\MODUL FULL FIX.pdf"
print(f"Checking if PDF exists: {os.path.exists(pdf_path)}")
if os.path.exists(pdf_path):
    print(f"File size: {os.path.getsize(pdf_path)} bytes")
