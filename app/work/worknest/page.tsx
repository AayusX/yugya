import DemoProjectIntro from "@/components/DemoProjectIntro";
import DemoLauncher from "@/components/demos/demo-launcher";
import WorknestDemo from "@/components/demos/WorknestDemo";
import { getDemo } from "@/lib/demos/registry";
import { WORKNEST_STEPS } from "@/lib/demos/worknest";
import { pageMetadata } from "@/lib/metadata";
import "@/components/demos/demos.css";
import "@/components/demos/worknest.css";

const demo = getDemo("worknest");

export const metadata = pageMetadata({
  title: demo.metaTitle,
  description: demo.metaDescription,
  path: demo.path,
  ogDescription: demo.ogDescription,
});

export default function WorknestDemoPage() {
  return (
    <main id="main">
      <DemoProjectIntro demo={demo}>
        <DemoLauncher demo={demo} steps={WORKNEST_STEPS}>
          <WorknestDemo />
        </DemoLauncher>
      </DemoProjectIntro>
    </main>
  );
}
