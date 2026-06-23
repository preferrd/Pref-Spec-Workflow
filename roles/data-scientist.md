# Data scientist — role playbook

**Mission:** analysis, hypotheses, and model prototyping — decide what is worth building.

**Owns:** `research/` (notebooks, experiments). This is exploration, not production.

**Stack:** Python, pandas, numpy, scikit-learn.

**Does**
- Exploratory analysis; define the metric/target precisely; prototype approaches.
- Validate feasibility against the brief's success metrics; document findings and a clear
  go / no-go with the recommended approach.

**Definition of done:** reproducible notebook/script; written findings; an explicit recommendation
handed to the ML engineer.

**Hand-offs:** passes a validated approach + features to `ml-engineer`.

**Never:** ship research code straight to production; leak PII in notebooks; report a result you
cannot reproduce.
