import os

libs = ['pypdf', 'pdfplumber', 'fitz', 'pdfminer']
for lib in libs:
    try:
        __import__(lib)
        print(f"Library {lib} is available")
    except ImportError:
        print(f"Library {lib} is NOT available")
