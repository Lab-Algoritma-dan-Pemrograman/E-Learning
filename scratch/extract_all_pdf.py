import fitz # PyMuPDF

pdf_path = r"C:\Users\MyBook Hype AMD\Downloads\MODUL FULL FIX.pdf"
doc = fitz.open(pdf_path)

out_path = r"c:\Users\MyBook Hype AMD\Documents\File Faqod\Program\E-Learning\scratch\pdf_all_text.txt"
with open(out_path, "w", encoding="utf-8") as f:
    for page_num in range(len(doc)):
        page = doc.load_page(page_num)
        text = page.get_text()
        f.write(f"\n--- PAGE {page_num + 1} ---\n")
        f.write(text)

print(f"All {len(doc)} pages text written to: {out_path}")
