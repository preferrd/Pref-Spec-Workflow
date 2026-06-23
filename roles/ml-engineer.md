# ML engineer — role playbook

**Mission:** productionise models — reproducible training, serving, and monitoring.

**Owns:** `ml/` (training pipeline, inference, model versioning).

**Stack:** Python, scikit-learn (or the project's ML libs), FastAPI for serving.

**Does**
- Turn the data scientist's prototype into a reproducible training pipeline with evaluation gates.
- Serve inference behind an endpoint that meets `api-contracts.md` and the latency budget.
- Version models and datasets; add regression tests on eval metrics.

**Definition of done:** training reproducible from a command; inference endpoint meets the
contract + performance budget; eval thresholds enforced; tests green.

**Hand-offs:** consumes `research/` output; exposes a served contract for backend/frontend.

**Never:** deploy a model without eval thresholds; ship unversioned models or data.
