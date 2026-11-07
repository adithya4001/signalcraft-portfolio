const missions = {
  research: {
    id: "DS / 01",
    targets: ["research", "verification", "source-mapping", "business-intelligence"]
  },
  hiring: {
    id: "DS / 02",
    targets: ["analytics", "dashboard", "geographic-analysis", "role-demand"]
  },
  model: {
    id: "DS / 03",
    targets: ["classification", "eligibility", "cross-validation", "public-benefit"]
  },
  campaign: {
    id: "DS / 04",
    targets: ["campaign-analysis", "conversion", "cost-per-result", "budget-recommendation"]
  },
  talent: {
    id: "DS / 05",
    targets: ["embeddings", "clustering", "candidate-profiles", "semantic-fit"]
  }
};

const cases = [
  {
    id: "research",
    kicker: "CASE 01 / UPTOSKILLS · DATA ANALYST INTERN",
    date: "DEC 2025 — MAR 2026",
    inputValue: "40",
    inputLabel: "data sources",
    methodLabel: "research + verification",
    outputValue: "287",
    outputLabel: "authenticated decision-makers",
    title: "From scattered sources to a usable research map.",
    copy: "Researched 40 sources and built a custom database of 287 authenticated corporate decision-makers. The work clarified company relationships and supported business-development decisions.",
    tags: ["desk research", "data validation", "business intelligence"],
    link: "#experience",
    linkLabel: "See the internship details",
    signals: ["research", "verification", "source-mapping", "business-intelligence"]
  },
  {
    id: "hiring",
    kicker: "CASE 02 / DATAVIZ · HIRING MARKET",
    date: "FEB — MAR 2026",
    inputValue: "399",
    inputLabel: "job records",
    methodLabel: "region + role analysis",
    outputValue: "68",
    outputLabel: "states and territories",
    title: "Make the shape of hiring easier to read.",
    copy: "Analysed 399 job records across 285 companies and 68 locations. HR and talent-acquisition roles made up 73.7% of the role mix, giving the team a clearer basis for outreach and training priorities.",
    tags: ["Power BI", "geographic analysis", "role demand"],
    link: "https://drive.google.com/file/d/1gX_sDjFpy9oHx2zyX1rCsc8CQmE3T3uC/view?usp=sharing",
    linkLabel: "View dashboard report (PDF)",
    signals: ["analytics", "dashboard", "geographic-analysis", "role-demand"]
  },
  {
    id: "model",
    kicker: "CASE 03 / EDUNET · NSAP CLASSIFIER",
    date: "JUL — AUG 2025",
    inputValue: "8",
    inputLabel: "data pipelines",
    methodLabel: "classification + validation",
    outputValue: "92.5%",
    outputLabel: "cross-validation accuracy",
    title: "Turn applicant details into an eligibility signal.",
    copy: "Built a multi-class NSAP eligibility classifier using IBM Cloud and watsonx.ai. The reported 92.5% is cross-validation accuracy from the project, not a production-impact claim.",
    tags: ["multi-class model", "cross-validation", "IBM Cloud · watsonx.ai"],
    link: "https://github.com/adithya4001/NSAP-ELIGIBILITY-PROJECT",
    linkLabel: "Explore the classifier project",
    signals: ["classification", "eligibility", "cross-validation", "public-benefit"]
  },
  {
    id: "campaign",
    kicker: "CASE 04 / EXCELERATE · CAMPAIGN ANALYSIS",
    date: "JUL — AUG 2025",
    inputValue: "30",
    inputLabel: "campaigns reviewed",
    methodLabel: "conversion + cost analysis",
    outputValue: "₹30.55",
    outputLabel: "cost per result · Campaign 3",
    title: "Find the segment that deserves another look.",
    copy: "Campaign 3 in Australia (ages 25–34) recorded 3 conversions at ₹30.55 per result. The analysis recommended shifting budget toward stronger Campaign 8 in Nigeria and Campaign 6 in India; no uplift is claimed.",
    tags: ["30 campaigns", "conversion analysis", "budget recommendation"],
    link: "#experience",
    linkLabel: "See the internship analysis",
    signals: ["campaign-analysis", "conversion", "cost-per-result", "budget-recommendation"]
  },
  {
    id: "talent",
    kicker: "CASE 05 / LUMINA · TALENT DISCOVERY",
    date: "JUN — JUL 2026",
    inputValue: "100,000+",
    inputLabel: "candidate profiles",
    methodLabel: "embeddings + K-Means",
    outputValue: "<5 min",
    outputLabel: "CPU-only processing time",
    title: "Find candidate patterns beyond keyword overlap.",
    copy: "Lumina uses language-model embeddings and K-Means to group more than 100,000 profiles in under five minutes on CPU. A what-if simulator and OLS dashboard help explore contextual fit and skill gaps.",
    tags: ["semantic search", "clustering", "what-if analysis"],
    link: "https://lumina-talent-os.streamlit.app/",
    linkLabel: "Open Lumina Talent OS",
    signals: ["embeddings", "clustering", "candidate-profiles", "semantic-fit"]
  }
];

const signalLabels = {
  research: "research",
  verification: "verification",
  "source-mapping": "source mapping",
  "business-intelligence": "business intelligence",
  analytics: "analytics",
  dashboard: "dashboard",
  "geographic-analysis": "geographic analysis",
  "role-demand": "role demand",
  classification: "classification",
  eligibility: "eligibility",
  "cross-validation": "cross-validation",
  "public-benefit": "public benefit",
  "campaign-analysis": "campaign analysis",
  conversion: "conversion",
  "cost-per-result": "cost per result",
  "budget-recommendation": "budget recommendation",
  embeddings: "embeddings",
  clustering: "clustering",
  "candidate-profiles": "candidate profiles",
  "semantic-fit": "semantic fit"
};

const buttons = [...document.querySelectorAll(".signal-tab")];
const output = document.querySelector("#signal-output");
const apiState = document.querySelector("#api-state");
const outputLink = document.querySelector("#output-link");
const baseTrack = [...document.querySelectorAll(".base-track i")];
let requestNumber = 0;

function rankLocally(missionId) {
  const mission = missions[missionId];
  if (!mission) return null;

  return cases
    .map((item) => {
      const reasons = mission.targets.filter((signal) => item.signals.includes(signal));
      return { ...item, matchCount: reasons.length, signalCount: mission.targets.length, reasons };
    })
    .sort((a, b) => b.matchCount - a.matchCount || a.id.localeCompare(b.id))[0];
}

function setApiState(isLive) {
  apiState.classList.toggle("is-live", isLive);
  apiState.querySelector("span").textContent = isLive ? "AWS API live" : "Local scoring";
  apiState.querySelector("small").textContent = isLive
    ? "Explainable evidence match · API Gateway + Lambda"
    : "Same signal scoring runs in this browser";
}

function renderCase(result, missionId, isLive) {
  if (!result || !missions[missionId] || !result.title || !result.link || !Array.isArray(result.tags)) return;

  document.querySelector("#output-kicker").textContent = result.kicker;
  document.querySelector("#output-date").textContent = result.date;
  document.querySelector("#input-value").textContent = result.inputValue;
  document.querySelector("#input-label").textContent = result.inputLabel;
  document.querySelector("#method-label").textContent = result.methodLabel;
  document.querySelector("#output-value").textContent = result.outputValue;
  document.querySelector("#output-label").textContent = result.outputLabel;
  document.querySelector("#output-title").textContent = result.title;
  document.querySelector("#output-copy").textContent = result.copy;
  document.querySelector("#base-note").textContent = `${result.matchCount}/${result.signalCount} shared signals · deterministic score`;
  document.querySelector("#case-number").textContent = missions[missionId].id;
  outputLink.href = result.link;
  outputLink.replaceChildren(document.createTextNode(`${result.linkLabel} `));
  const arrow = document.createElement("span");
  arrow.textContent = "↗";
  outputLink.append(arrow);
  outputLink.setAttribute("aria-label", `${result.linkLabel}: ${result.title}`);

  const tagContainer = document.querySelector("#output-tags");
  tagContainer.replaceChildren(...result.tags.map((tag) => {
    const chip = document.createElement("span");
    chip.textContent = tag;
    return chip;
  }));

  const litCount = Math.max(0, Math.min(baseTrack.length, result.matchCount || 0));
  baseTrack.forEach((bar, index) => bar.classList.toggle("is-lit", index < litCount));
  document.querySelector(".output-flow").setAttribute("aria-label", `${result.inputValue} ${result.inputLabel} → ${result.outputValue} ${result.outputLabel}`);
  output.setAttribute("aria-label", `${result.title} Selected because ${result.reasons.map((signal) => signalLabels[signal] || signal).join(", ")} match this mission.`);
  setApiState(isLive);
  output.classList.remove("is-updating");
}

async function routeMission(missionId) {
  const currentRequest = ++requestNumber;
  const fallback = rankLocally(missionId);
  if (!fallback) return;
  renderCase(fallback, missionId, false);
  output.classList.add("is-updating");

  const apiBase = (window.PORTFOLIO_API_URL || "").trim().replace(/\/$/, "");
  if (!apiBase) {
    output.classList.remove("is-updating");
    return;
  }

  try {
    const response = await fetch(`${apiBase}/mission`, {
      method: "POST",
      headers: { "Content-Type": "application/json" },
      body: JSON.stringify({ mission: missionId }),
      signal: AbortSignal.timeout(4500)
    });
    if (!response.ok) throw new Error(`API returned ${response.status}`);
    const result = await response.json();
    if (currentRequest === requestNumber) renderCase(result, missionId, true);
  } catch {
    if (currentRequest === requestNumber) renderCase(fallback, missionId, false);
  }
}

buttons.forEach((button) => {
  button.addEventListener("click", () => {
    buttons.forEach((item) => {
      const selected = item === button;
      item.classList.toggle("is-active", selected);
      item.setAttribute("aria-pressed", String(selected));
    });
    routeMission(button.dataset.signal);
  });
});

document.querySelector("#year").textContent = String(new Date().getFullYear());
routeMission("research");

const achievementDeck = document.querySelector("#achievement-deck");
if (achievementDeck) {
  const achievementSlides = [...achievementDeck.querySelectorAll("[data-achievement]")];
  const achievementViewport = document.querySelector("#achievement-viewport");
  const achievementCurrent = document.querySelector("#achievement-current");
  const achievementProgress = document.querySelector("#achievement-progress");
  const achievementProgressFill = document.querySelector("#achievement-progress-fill");
  const achievementStars = document.querySelector("#achievement-stars");
  const previousAchievement = document.querySelector("#achievement-prev");
  const nextAchievement = document.querySelector("#achievement-next");
  const reduceAchievementMotion = window.matchMedia("(prefers-reduced-motion: reduce)");
  let activeAchievement = 0;
  let swipeStart = null;
  let starClearTimer = null;

  achievementSlides.forEach((slide, index) => {
    const active = index === activeAchievement;
    slide.hidden = !active;
    slide.setAttribute("aria-hidden", String(!active));
    slide.classList.toggle("is-current", active);
  });

  function burstAchievementStars(direction) {
    if (!achievementStars || reduceAchievementMotion.matches) return;
    window.clearTimeout(starClearTimer);
    achievementStars.replaceChildren();

    for (let index = 0; index < 10; index += 1) {
      const star = document.createElement("span");
      const drift = direction * (18 + ((index * 13) % 42));
      star.className = "achievement-star";
      star.textContent = "✦";
      star.style.left = `${8 + ((index * 29) % 84)}%`;
      star.style.top = `${12 + ((index * 37) % 72)}%`;
      star.style.setProperty("--star-drift", `${drift}px`);
      star.style.setProperty("--star-delay", `${(index % 5) * 24}ms`);
      achievementStars.append(star);
    }

    starClearTimer = window.setTimeout(() => achievementStars.replaceChildren(), 900);
  }

  function showAchievement(nextIndex, direction) {
    const next = (nextIndex + achievementSlides.length) % achievementSlides.length;
    if (next === activeAchievement) return;

    const outgoing = achievementSlides[activeAchievement];
    const incoming = achievementSlides[next];
    outgoing.hidden = true;
    outgoing.setAttribute("aria-hidden", "true");
    outgoing.classList.remove("is-current", "is-entering");

    activeAchievement = next;
    incoming.hidden = false;
    incoming.setAttribute("aria-hidden", "false");
    incoming.dataset.direction = direction < 0 ? "previous" : "next";
    incoming.classList.add("is-current");
    incoming.classList.remove("is-entering");

    if (achievementCurrent) achievementCurrent.textContent = String(next + 1).padStart(2, "0");
    if (achievementProgress) achievementProgress.setAttribute("aria-valuenow", String(next + 1));
    if (achievementProgressFill) achievementProgressFill.style.width = `${((next + 1) / achievementSlides.length) * 100}%`;
    burstAchievementStars(direction);

    if (!reduceAchievementMotion.matches) {
      window.requestAnimationFrame(() => incoming.classList.add("is-entering"));
      window.setTimeout(() => incoming.classList.remove("is-entering"), 520);
    }
  }

  previousAchievement?.addEventListener("click", () => showAchievement(activeAchievement - 1, -1));
  nextAchievement?.addEventListener("click", () => showAchievement(activeAchievement + 1, 1));

  achievementDeck.addEventListener("keydown", (event) => {
    if (event.altKey || event.ctrlKey || event.metaKey || event.target.closest("a, button, input, textarea, select")) return;
    if (event.key === "ArrowRight") {
      event.preventDefault();
      showAchievement(activeAchievement + 1, 1);
    } else if (event.key === "ArrowLeft") {
      event.preventDefault();
      showAchievement(activeAchievement - 1, -1);
    }
  });

  achievementViewport?.addEventListener("pointerdown", (event) => {
    if (event.button !== undefined && event.button !== 0) return;
    if (event.target.closest("a, button")) return;
    swipeStart = { id: event.pointerId, x: event.clientX, y: event.clientY };
    achievementViewport.setPointerCapture?.(event.pointerId);
  });

  achievementViewport?.addEventListener("pointerup", (event) => {
    if (!swipeStart || swipeStart.id !== event.pointerId) return;
    const deltaX = event.clientX - swipeStart.x;
    const deltaY = event.clientY - swipeStart.y;
    swipeStart = null;
    if (Math.abs(deltaX) < 48 || Math.abs(deltaX) < Math.abs(deltaY) * 1.2) return;
    showAchievement(activeAchievement + (deltaX < 0 ? 1 : -1), deltaX < 0 ? 1 : -1);
  });

  achievementViewport?.addEventListener("pointercancel", () => { swipeStart = null; });
}
