import DemoProjectIntro from "@/components/DemoProjectIntro";
import DemoLauncher from "@/components/demos/demo-launcher";
import CampusFlowDemo from "@/components/demos/CampusFlowDemo";
import { getDemo } from "@/lib/demos/registry";
import { CAMPUSFLOW_STEPS } from "@/lib/demos/campusflow";
import { pageMetadata } from "@/lib/metadata";
import "@/components/demos/demos.css";
import "@/components/demos/campusflow.css";

const demo = getDemo("campusflow");

export const metadata = pageMetadata({
  title: demo.metaTitle,
  description: demo.metaDescription,
  path: demo.path,
  ogDescription: demo.ogDescription,
});

export default function CampusFlowDemoPage() {
  return (
    <main id="main">
      <DemoProjectIntro demo={demo}>
        <DemoLauncher demo={demo} steps={CAMPUSFLOW_STEPS}>
          <CampusFlowDemo />
        </DemoLauncher>
      </DemoProjectIntro>
    </main>
  );
}
