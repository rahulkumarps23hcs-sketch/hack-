"""Entry point placeholder for AI and analytics features.

Use this module to prototype, in the future:
- Mental health check-in scoring
- Risk level rules (low / medium / high)
- Trend analysis over time (e.g., rolling averages, volatility)

Important:
- This is a hackathon scaffold, not a medical device.
- Any real-world deployment must be validated with qualified professionals.
"""

from typing import Any, Dict
import math
import random


# --- Configuration constants -------------------------------------------------

# Mental health scoring bounds
MENTAL_SCORE_MIN = 0.0
MENTAL_SCORE_MAX = 10.0

# Aggregate severity thresholds
AGGREGATE_LOW_MAX = 3.5
AGGREGATE_MODERATE_MAX = 6.5

# "Low"-risk guard rails
LOW_RISK_MAX_STRESS = 5.0
LOW_RISK_MAX_ANXIETY = 5.0
LOW_RISK_MIN_MOOD = 6.0

# Alert trigger thresholds
ALERT_MAX_LOW_MOOD = 2.0
ALERT_MIN_HIGH_STRESS = 8.0
ALERT_MIN_HIGH_ANXIETY = 8.0


def _coerce_and_clamp_score(name: str, value: float) -> float:
    """Coerce an incoming score to float, validate, and clamp to [0, 10].

    Raises a ValueError with a clear message if the value is not numeric or
    not finite. This keeps the public analyzer functions robust to bad input
    while maintaining the same numerical behavior for valid values.
    """

    try:
        numeric = float(value)
    except (TypeError, ValueError) as exc:
        raise ValueError(f"{name} must be a numeric value, got {value!r}.") from exc

    if not math.isfinite(numeric):
        raise ValueError(f"{name} must be a finite number, got {numeric!r}.")

    return max(MENTAL_SCORE_MIN, min(MENTAL_SCORE_MAX, numeric))


def analyze_mental_health(
    mood_score: float, stress_score: float, anxiety_score: float
) -> Dict[str, Any]:
    """Analyze a single mental health check-in using simple rule-based logic.

    Scores are expected on a 0–10 scale:
    - Higher mood means feeling better.
    - Higher stress and anxiety mean greater difficulty.

    Values are coerced to floats, validated, and clamped to [0, 10]. On
    invalid inputs a ValueError is raised so that callers can respond with
    a safe behavior (for example, returning a 400 response or falling back
    to a neutral risk level instead of guessing).

    The function returns a dictionary suitable for JSON serialization with:
    - "risk_level": "low" | "moderate" | "high"
    - "alert": bool flag for notable concern
    - "recommendations": list of short, human-readable suggestions
    """

    mood = _coerce_and_clamp_score("mood_score", mood_score)
    stress = _coerce_and_clamp_score("stress_score", stress_score)
    anxiety = _coerce_and_clamp_score("anxiety_score", anxiety_score)

    # Convert mood into a "problem" component so that low mood increases risk.
    mood_component = MENTAL_SCORE_MAX - mood
    aggregate = (mood_component + stress + anxiety) / 3.0

    # Determine overall risk level based on aggregated severity and guard rails.
    if (
        aggregate < AGGREGATE_LOW_MAX
        and stress < LOW_RISK_MAX_STRESS
        and anxiety < LOW_RISK_MAX_ANXIETY
        and mood >= LOW_RISK_MIN_MOOD
    ):
        risk_level = "low"
    elif aggregate < AGGREGATE_MODERATE_MAX:
        risk_level = "moderate"
    else:
        risk_level = "high"

    # Trigger an alert when overall risk is high or any single dimension is
    # clearly concerning on its own.
    alert = bool(
        risk_level == "high"
        or mood <= ALERT_MAX_LOW_MOOD
        or stress >= ALERT_MIN_HIGH_STRESS
        or anxiety >= ALERT_MIN_HIGH_ANXIETY
    )

    recommendations = []

    if risk_level == "low":
        recommendations.append(
            "Maintain current healthy routines and continue regular check-ins."
        )
        recommendations.append(
            "Keep tracking mood, stress, and anxiety to spot changes early."
        )
    elif risk_level == "moderate":
        recommendations.append(
            "Consider simple coping strategies such as relaxation exercises or short breaks."
        )
        recommendations.append(
            "Monitor how you feel over the next few days and reach out if things worsen."
        )
    else:
        recommendations.append(
            "Consider talking with a trusted person or mental health professional."
        )
        recommendations.append(
            "If you feel in immediate danger or crisis, contact local emergency or crisis support services."
        )

    return {
        "risk_level": risk_level,
        "alert": alert,
        "recommendations": recommendations,
    }


def _classify_day_trend(
    heart_rate: float, sleep_hours: float, steps: int, sugar_level: float
) -> str:
    """Classify a single day into normal / warning / critical.

    This helper applies simple rule-based penalties to each metric based on
    clinically inspired but non-diagnostic thresholds. It is intended for
    visualization and experimentation only.
    """

    score = 0

    # Heart rate thresholds (beats per minute).
    if heart_rate > 100 or heart_rate < 50:
        score += 2
    elif heart_rate >= 90 or heart_rate <= 55:
        score += 1

    # Sleep duration thresholds (hours).
    if sleep_hours < 5 or sleep_hours > 10:
        score += 2
    elif sleep_hours < 6 or sleep_hours > 9:
        score += 1

    # Activity thresholds (steps).
    if steps < 1500:
        score += 2
    elif steps < 3000:
        score += 1

    # Blood sugar thresholds (mg/dL).
    if sugar_level > 180 or sugar_level < 60:
        score += 2
    elif sugar_level > 140 or sugar_level < 70:
        score += 1

    if score <= 1:
        return "normal"
    if score <= 3:
        return "warning"
    return "critical"


def simulate_wearable_trends(days: int = 7, seed=None) -> Dict[str, Any]:
    """Simulate wearable data and trends for a configurable number of days.

    The structure of the returned dictionary is JSON friendly and can be used
    directly by frontend chart components:

    {
        "labels": ["Day 1", ...],
        "metrics": {
            "heart_rate": [...],
            "sleep_hours": [...],
            "steps": [...],
            "sugar_level": [...],
        },
        "trend": {
            "per_day": ["normal" | "warning" | "critical", ...],
            "overall": "normal" | "warning" | "critical",
        },
    }
    
    If ``days`` is less than 1 a ValueError is raised; callers can either
    validate input earlier or fall back to a default window (for example,
    7 days) before invoking this function.
    
    The simulated values and thresholds are intended for demos and early
    prototyping only and must not be treated as clinical guidance.
    """

    if days < 1:
        raise ValueError("days must be at least 1")

    rng = random.Random(seed)

    labels = []
    heart_rates = []
    sleep_hours = []
    steps = []
    sugar_levels = []
    per_day_trend = []

    for i in range(days):
        label = f"Day {i + 1}"
        labels.append(label)

        # Heart rate (bpm): slightly increasing trend with noise and clipping.
        hr = rng.normalvariate(75 + i * 0.5, 5.0)
        hr = max(45.0, min(120.0, hr))

        # Sleep duration (hours): gently decreasing trend with noise and bounds.
        sleep = rng.normalvariate(7.5 - i * 0.1, 0.7)
        sleep = max(3.0, min(11.0, sleep))

        # Daily steps: gradually reducing activity with realistic limits.
        step_count = int(rng.normalvariate(7500 - i * 200, 1200))
        step_count = max(500, min(16000, step_count))

        # Estimated blood sugar (mg/dL): slowly rising trend with noise.
        sugar = rng.normalvariate(95 + i * 1.5, 12.0)
        sugar = max(60.0, min(220.0, sugar))

        heart_rates.append(round(hr, 1))
        sleep_hours.append(round(sleep, 2))
        steps.append(step_count)
        sugar_levels.append(round(sugar, 1))

        status = _classify_day_trend(hr, sleep, step_count, sugar)
        per_day_trend.append(status)

    critical_count = per_day_trend.count("critical")
    warning_count = per_day_trend.count("warning")

    # Overall trend is escalated to "critical" when there is any critical day
    # or when most days are warning/critical; otherwise fall back gradually.
    if critical_count > 0 or (warning_count + critical_count) >= (days // 2 + 1):
        overall_trend = "critical"
    elif warning_count > 0:
        overall_trend = "warning"
    else:
        overall_trend = "normal"

    return {
        "labels": labels,
        "metrics": {
            "heart_rate": heart_rates,
            "sleep_hours": sleep_hours,
            "steps": steps,
            "sugar_level": sugar_levels,
        },
        "trend": {
            "per_day": per_day_trend,
            "overall": overall_trend,
        },
    }


def main() -> None:
    """Temporary placeholder function.

    Replace this function with the actual orchestration code for
    scoring and trend analysis once the design is agreed upon.
    """

    print("ai-features placeholder - implement scoring and trend analysis here.")


if __name__ == "__main__":
    main()
