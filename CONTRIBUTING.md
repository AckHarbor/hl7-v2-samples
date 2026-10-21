# Contributing

Thanks for helping improve these samples. Issues and pull requests are welcome.

## Ground rules

- **All data is fictional; never commit real PHI.** Use obviously fake values:
  names like `TESTPATIENT^FAKE`, IDs like `TEST000001`, `555` phone numbers,
  state `ZZ` and ZIP `00000`. Pull requests containing anything that looks like
  real patient data will be closed and the history cleaned.
- Target **HL7 v2.5** (`MSH-12` = `2.5`) unless the file name says otherwise, and
  cite the chapter/section of the standard when you correct a field.
- Keep the **CR (`\r`) segment terminators** in `.hl7` files. `.gitattributes`
  stops git from converting them; check that your editor does not either.
- One message per `.hl7` file. Name it after the message structure or ACK code,
  for example `ADT_A08.hl7` or `ACK_AE.hl7`. Put deliberately broken messages in
  `samples/invalid/`.
- Update the table in `README.md` when you add a file.

## Checking a message

- Paste it into the free [HL7 Viewer](https://ackharbor.com/tools/hl7-viewer.html)
  or the [Sandbox](https://ackharbor.com/sandbox/) to see each field and the ACK
  it gets back.
- Or list its fields locally: `node tools/hl7-fields.js samples/ADT_A01.hl7`.

## Licensing of contributions

By contributing you agree that code is released under the MIT License
(`LICENSE`) and samples/docs under CC BY 4.0 (`LICENSE-CONTENT`).
