import ToolPage from "../components/ToolPage";

export default function ScreenTimeHoroscopePage() {
  return (
    <ToolPage
      tag="Tool — Screen Time Horoscope"
      title={<>Screen Time <span>Horoscope</span></>}
      subtitle="[Subtitle goes here — describe what this tool does in one sentence.]"
      launchUrl="[URL_GOES_HERE]"
      ctaLabel="Get Your Horoscope ↗"
      aboutQuote="[A short, punchy tagline for this tool goes here.]"
      aboutBody={
        <>
          <p>[Description paragraph 1 — explain what this tool is and who it's for.]</p>
          <p>[Description paragraph 2 — explain the approach or methodology.]</p>
        </>
      }
      featuresTitle={<>How it <em>Works</em></>}
      features={[
        {
          num: "01",
          title: "[Feature Title]",
          body: "[Description of the first step or feature of this tool.]",
        },
        {
          num: "02",
          title: "[Feature Title]",
          body: "[Description of the second step or feature of this tool.]",
        },
        {
          num: "03",
          title: "[Feature Title]",
          body: "[Description of the third step or feature of this tool.]",
        },
      ]}
    />
  );
}
