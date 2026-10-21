# HL7 v2.5 field cheat sheet

Key fields of the segments used in this repo, with their HL7 v2.5 names.
This is a quick reference, not the full standard: it lists the fields you meet
most often, not every field. "(B)" marks fields kept only for backward
compatibility in v2.5.

## Delimiters (set in MSH-1 and MSH-2)

| Character | Name | Separates |
|---|---|---|
| `\|` | Field separator (MSH-1) | Fields |
| `^` | Component separator | Components inside a field |
| `~` | Repetition separator | Repeats of the same field |
| `\` | Escape character | Escape sequences such as `\F\` (a literal `\|`) |
| `&` | Subcomponent separator | Subcomponents inside a component |

Segments end with a carriage return (`\r`, hex `0D`), not a line feed.

**Notation:** `PID-5` = field 5 of PID. `PID-5.1` = its first component.
`OBX[2]-5` = field 5 of the second OBX. In MSH, MSH-1 *is* the `|`
right after "MSH", so MSH fields are numbered one higher than a plain count of
the `|`-separated values after the segment name would suggest.

## MSH: Message Header

| Field | Name | Notes |
|---|---|---|
| MSH-1 | Field Separator | Always `\|` in practice |
| MSH-2 | Encoding Characters | Usually `^~\&` |
| MSH-3 | Sending Application | |
| MSH-4 | Sending Facility | |
| MSH-5 | Receiving Application | |
| MSH-6 | Receiving Facility | |
| MSH-7 | Date/Time Of Message | `YYYYMMDDHHMMSS±ZZZZ`, e.g. `20260101120000-0500` |
| MSH-9 | Message Type | type^trigger^structure, e.g. `ADT^A04^ADT_A01` |
| MSH-10 | Message Control ID | Unique per message; echoed back in MSA-2 |
| MSH-11 | Processing ID | `P` production, `T` training, `D` debugging |
| MSH-12 | Version ID | `2.5` |
| MSH-15 | Accept Acknowledgment Type | Enhanced mode: `AL`, `NE`, `ER`, `SU` |
| MSH-16 | Application Acknowledgment Type | Same values as MSH-15 |

## PID: Patient Identification

| Field | Name | Notes |
|---|---|---|
| PID-1 | Set ID - PID | |
| PID-2 | Patient ID (B) | Use PID-3 instead |
| PID-3 | Patient Identifier List | Repeating CX: ID^^^assigning authority^identifier type (e.g. `MR`) |
| PID-5 | Patient Name | XPN: family^given^second/middle^suffix^prefix |
| PID-7 | Date/Time of Birth | `YYYYMMDD` |
| PID-8 | Administrative Sex | Table 0001: `F`, `M`, `O`, `U`, `A`, `N` |
| PID-11 | Patient Address | XAD: street^other^city^state^ZIP^country |
| PID-13 | Phone Number - Home | XTN: ^use code^equipment^email^country^area^local, e.g. `^PRN^PH^^1^555^5550100` |
| PID-14 | Phone Number - Business | XTN |
| PID-18 | Patient Account Number | |
| PID-19 | SSN Number - Patient (B) | Avoid; never put real SSNs in samples |
| PID-29 | Patient Death Date and Time | |
| PID-30 | Patient Death Indicator | `Y` / `N` |

## PV1: Patient Visit

| Field | Name | Notes |
|---|---|---|
| PV1-1 | Set ID - PV1 | |
| PV1-2 | Patient Class | Table 0004, e.g. `E` emergency, `I` inpatient, `O` outpatient, `P` preadmit |
| PV1-3 | Assigned Patient Location | PL: point of care^room^bed^facility |
| PV1-4 | Admission Type | |
| PV1-7 | Attending Doctor | XCN: ID^family^given^... |
| PV1-8 | Referring Doctor | |
| PV1-10 | Hospital Service | |
| PV1-17 | Admitting Doctor | |
| PV1-19 | Visit Number | |
| PV1-36 | Discharge Disposition | |
| PV1-44 | Admit Date/Time | |
| PV1-45 | Discharge Date/Time | |

## ORC: Common Order

| Field | Name | Notes |
|---|---|---|
| ORC-1 | Order Control | Table 0119, e.g. `NW` new order, `CA` cancel request, `OK` accepted, `SC` status changed, `RE` observations to follow |
| ORC-2 | Placer Order Number | The ordering system's order ID |
| ORC-3 | Filler Order Number | The performing system's order ID |
| ORC-5 | Order Status | Table 0038, e.g. `IP` in process, `CM` completed |
| ORC-9 | Date/Time of Transaction | |
| ORC-12 | Ordering Provider | XCN |

## OBR: Observation Request

| Field | Name | Notes |
|---|---|---|
| OBR-1 | Set ID - OBR | |
| OBR-2 | Placer Order Number | Matches ORC-2 |
| OBR-3 | Filler Order Number | Matches ORC-3 |
| OBR-4 | Universal Service Identifier | What was ordered, e.g. `2345-7^Glucose [Mass/volume] in Serum or Plasma^LN` |
| OBR-7 | Observation Date/Time | Clinically relevant time, e.g. specimen collection |
| OBR-16 | Ordering Provider | |
| OBR-22 | Results Rpt/Status Chng - Date/Time | When the result was reported or changed |
| OBR-24 | Diagnostic Serv Sect ID | Table 0074, e.g. `CH` chemistry, `HM` hematology, `RAD` radiology |
| OBR-25 | Result Status | Table 0123, e.g. `P` preliminary, `F` final, `C` correction |

## OBX: Observation/Result

| Field | Name | Notes |
|---|---|---|
| OBX-1 | Set ID - OBX | 1, 2, 3... within the OBR |
| OBX-2 | Value Type | Table 0125, e.g. `NM` numeric, `ST` string, `TX` text, `CWE` coded |
| OBX-3 | Observation Identifier | Usually a LOINC code: code^text^`LN` |
| OBX-4 | Observation Sub-ID | |
| OBX-5 | Observation Value | Must match OBX-2 |
| OBX-6 | Units | e.g. `mg/dL^mg/dL^UCUM` |
| OBX-7 | References Range | e.g. `70-99` |
| OBX-8 | Abnormal Flags | Table 0078, e.g. `N` normal, `L` low, `H` high |
| OBX-11 | Observation Result Status | Table 0085, e.g. `P` preliminary, `F` final, `C` correction |
| OBX-14 | Date/Time of the Observation | |
| OBX-19 | Date/Time of the Analysis | New in v2.5 |

## MSA: Message Acknowledgment

| Field | Name | Notes |
|---|---|---|
| MSA-1 | Acknowledgment Code | Table 0008: `AA` accept, `AE` error, `AR` reject (original mode); `CA`, `CE`, `CR` (enhanced-mode commit ACKs) |
| MSA-2 | Message Control ID | The MSH-10 of the message being acknowledged |
| MSA-3 | Text Message (B) | Free text; use ERR instead in v2.5 |

## ERR: Error (v2.5 layout)

| Field | Name | Notes |
|---|---|---|
| ERR-1 | Error Code and Location (B) | Old pre-v2.5 layout; leave empty |
| ERR-2 | Error Location | ERL: segment^sequence^field^repetition^component^subcomponent, e.g. `PID^1^3` |
| ERR-3 | HL7 Error Code | Table 0357, e.g. `101^Required field missing^HL70357` |
| ERR-4 | Severity | Table 0516: `E` error, `W` warning, `I` information |
| ERR-5 | Application Error Code | The receiver's own code |
| ERR-7 | Diagnostic Information | |
| ERR-8 | User Message | |

Common table 0357 codes: `0` message accepted, `100` segment sequence error,
`101` required field missing, `102` data type error, `103` table value not
found, `200` unsupported message type, `201` unsupported event code, `202`
unsupported processing ID, `203` unsupported version ID, `207` application
internal error.

## Common message types

| MSH-9 | Meaning |
|---|---|
| `ADT^A01^ADT_A01` | Admit/visit notification |
| `ADT^A04^ADT_A01` | Register a patient (e.g. outpatient or ED registration) |
| `ADT^A08^ADT_A01` | Update patient information |
| `ADT^A03^ADT_A03` | Discharge/end visit |
| `ORM^O01^ORM_O01` | General order |
| `ORU^R01^ORU_R01` | Unsolicited observation result |
| `ACK^<trigger>^ACK` | General acknowledgment |

---
All data in this repository is fictional; never commit real PHI.

HL7® and FHIR® are registered trademarks of Health Level Seven International; use does not constitute endorsement.
