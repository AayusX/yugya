import DemoProjectIntro from "@/components/DemoProjectIntro";
import DemoLauncher from "@/components/demos/demo-launcher";
import SavorDemo from "@/components/demos/SavorDemo";
import { getDemo } from "@/lib/demos/registry";
import { SAVOR_STEPS } from "@/lib/demos/savor";
import { pageMetadata } from "@/lib/metadata";
import "@/components/demos/demos.css";
import "@/components/demos/savor.css";

const demo = getDemo("savor");

export const metadata = pageMetadata({
  title: demo.metaTitle,
  description: demo.metaDescription,
  path: demo.path,
  ogDescription: demo.ogDescription,
});

export default function SavorDemoPage() {
  return (
    <main id="main">
      <DemoProjectIntro demo={demo}>
        <DemoLauncher demo={demo} steps={SAVOR_STEPS}>
          <SavorDemo />
        </DemoLauncher>
      </DemoProjectIntro>
    </main>
  );
}
