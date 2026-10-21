# hl7-v2-samples

Free, **fully fictional** HL7® v2.5 sample messages, a FHIR® R4 Patient example
and a one-page field cheat sheet, from [AckHarbor™ Academy](https://ackharbor.com).

Use them to learn to read interface messages, test a parser or an interface
engine, or demo a feed, without going anywhere near real patient data.

> **All data is fictional; never commit real PHI.**
> Every name, ID, address and phone number here is invented: patient
> `TESTPATIENT^FAKE^A`, MRN `TEST000001`, `555` phone numbers, state `ZZ`,
> ZIP `00000`.

## Layout

```
samples/                 HL7 v2.5 messages, one per file, CR segment terminators
  ADT_A01.hl7            ADT^A01  admit/visit notification (inpatient)
  ADT_A04.hl7            ADT^A04  register a patient (outpatient visit)
  ADT_A08.hl7            ADT^A08  update patient information (new address and phone)
  ORM_O01.hl7            ORM^O01  new lab order (ORC-1 = NW, glucose, LOINC 2345-7)
  ORU_R01.hl7            ORU^R01  final lab result for that order (OBX-11 = F)
  ACK_AA.hl7             ACK      application accept (MSA-1 = AA) for the A01
  ACK_AE.hl7             ACK      application error (MSA-1 = AE) with ERR: PID-3 missing
  ACK_AR.hl7             ACK      application reject (MSA-1 = AR), ERR 200: a lab that does not accept DFT^P03
  invalid/
    ADT_A04_missing_PID3.hl7   broken on purpose: the A04 that ACK_AE.hl7 answers
fhir/
  Patient-example-fake-001.json   the same fictional patient as a FHIR R4 Patient
tools/
  hl7-fields.js          tiny Node.js script that lists every field with its position
CHEATSHEET.md            key MSH, PID, PV1, ORC, OBR, OBX, MSA and ERR fields (v2.5)
```

All the messages share one fictional patient and one fictional set of
systems (`FAKEAPP`/`FAKEHOSP` on the hospital side, `DEMOAPP`, `DEMOLAB` and
`DEMOFAC` on the receiving side). The ORU answers the ORM through the same
placer order number (`ORD0001^FAKEAPP`), and each ACK echoes the MSH-10 of the
message it answers in MSA-2.

## How to read a message

Take the first lines of `samples/ADT_A01.hl7`:

```
MSH|^~\&|FAKEAPP|FAKEHOSP|DEMOAPP|DEMOFAC|20260101120000-0500||ADT^A01^ADT_A01|MSG00001|P|2.5
PID|1||TEST000001^^^FAKEHOSP^MR||TESTPATIENT^FAKE^A||19800101|U|||...
```

1. **Each line is a segment.** The first three characters name it (`MSH`,
   `PID`, `PV1`...). On the wire, segments are separated by a carriage return
   (`\r`), which is what the `.hl7` files here use. Some editors show the whole
   message on one line because of that; the viewer below splits it for you.
2. **`|` separates fields**, and fields are counted from 1 after the segment
   name: in PID, `TEST000001^^^FAKEHOSP^MR` is PID-3 and
   `TESTPATIENT^FAKE^A` is PID-5.
3. **MSH is the exception.** The `|` right after "MSH" *is* MSH-1, and `^~\&`
   is MSH-2 (component, repetition, escape and subcomponent characters). So
   `ADT^A01^ADT_A01` is MSH-9, the message type, and `MSG00001` is MSH-10, the
   message control ID.
4. **`^` splits a field into components.** PID-5 `TESTPATIENT^FAKE^A` is
   family name ^ given name ^ middle initial. **`~`** separates repeats of a
   field and **`&`** splits a component into subcomponents.
5. **Empty fields still count.** `||` is an empty field, so you always count
   separators, never values.
6. **ACKs point back at the original.** In `ACK_AA.hl7`, MSA-2 = `MSG00001`,
   the MSH-10 of the A01 it acknowledges. MSA-1 is the verdict: `AA` accepted,
   `AE` error, `AR` rejected. With AE or AR, an `ERR` segment says what was
   wrong: `ERR||PID^1^3|101^Required field missing^HL70357|E` means "PID, first
   occurrence, field 3: required field missing (HL7 table 0357 code 101),
   severity Error". To fix an AE, correct the data and send the message again
   with a new MSH-10.

The [cheat sheet](CHEATSHEET.md) lists the key fields of every segment used here.

To list the fields of any file locally (Node.js 14+, no dependencies):

```
node tools/hl7-fields.js samples/ORU_R01.hl7
```

## Free tools

- **HL7 Viewer**: paste any message to see every field labeled:
  https://ackharbor.com/tools/hl7-viewer.html
- **Quick Reference**: free HL7 v2 + FHIR R4 quick reference:
  https://ackharbor.com/quick-reference/
- **Sandbox**: send these messages through a browser-based practice interface
  engine and watch the ACK come back: https://ackharbor.com/sandbox/

## Notes on the samples

- Version: HL7 v2.5 (`MSH-12` = `2.5`). Times carry a UTC offset
  (`-0500`).
- `.gitattributes` marks `*.hl7` as `-text` so git never converts the CR
  terminators. If you copy a sample by hand and your tool needs one segment
  per line, convert `\r` to `\n` yourself.
- These are teaching samples. Real interfaces add many more fields and
  site-specific rules; check your interface specification.

## License

- Code (`tools/`): [MIT](LICENSE).
- Sample messages and documentation: [CC BY 4.0](LICENSE-CONTENT). Please
  credit "AckHarbor™ Academy (https://ackharbor.com)".

Contributions are welcome; see [CONTRIBUTING.md](CONTRIBUTING.md).

---
AckHarbor™ is a trademark of DaRider Tech LLC.
HL7® and FHIR® are registered trademarks of Health Level Seven International; use does not constitute endorsement.
