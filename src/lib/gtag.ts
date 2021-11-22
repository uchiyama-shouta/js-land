type ContactEvent = {
  action: "submit_form";
  category: "contact";
  label: string;
  value?: any;
};

type ClickEvent = {
  action: "click";
  category: "other";
  label: string;
  value?: any;
};

export type Event = ContactEvent | ClickEvent;

const GA_TRACKING_ID = process.env.NEXT_PUBLIC_GA_TRACKING_ID || "";
const pageview = (url: string) => {
  window.gtag("config", GA_TRACKING_ID, {
    page_path: url,
  });
};
const event = ({ action, category, label, value }: Event) => {
  window.gtag("event", action, {
    event_category: category,
    event_label: label,
    value: value,
  });
};
export { GA_TRACKING_ID, pageview, event };
