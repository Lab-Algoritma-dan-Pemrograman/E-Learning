import fitz # PyMuPDF
import sys

pdf_path = r"C:\Users\MyBook Hype AMD\Downloads\MODUL FULL FIX.pdf"
doc = fitz.open(pdf_path)

print(f"Number of pages: {len(doc)}")

# Get table of contents if available
toc = doc.get_toc()
if toc:
    print("Table of Contents:")
    for item in toc:
        print(item)
else:
    print("No Table of Contents found.")

# Write text of first 20 pages to see structure
out_path = r"c:\Users\MyBook Hype AMD\Documents\File Faqod\Program\E-Learning\scratch\pdf_first_pages.txt"
with open(out_path, "w", encoding="utf-8") as f:
    for page_num in range(min(50, len(doc))):
        page = doc.load_page(page_num)
        text = page.get_text()
        f.write(f"\n--- PAGE {page_num + 1} ---\n")
        f.write(text)

print(f"First 50 pages text written to: {out_path}")
