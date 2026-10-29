// The home intro plays once per browser session. This runs in <head> before first paint so a returning
// visitor (or anyone who prefers reduced motion) never sees the overlay flash: it marks <html data-intro="skip">.
export const INTRO_KEY = "24karat:intro";

export const introScript = `try{if(sessionStorage.getItem("${INTRO_KEY}")||matchMedia("(prefers-reduced-motion: reduce)").matches)document.documentElement.dataset.intro="skip"}catch(e){document.documentElement.dataset.intro="skip"}`;
