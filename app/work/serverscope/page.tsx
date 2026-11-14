import DemoProjectIntro from "@/components/DemoProjectIntro";
import DemoLauncher from "@/components/demos/demo-launcher";
import ServerScopeDemo from "@/components/demos/ServerScopeDemo";
import { getDemo } from "@/lib/demos/registry";
import { SERVERSCOPE_STEPS } from "@/lib/demos/serverscope";
import { pageMetadata } from "@/lib/metadata";
import "@/components/demos/demos.css";
import "@/components/demos/serverscope.css";

const demo = getDemo("serverscope");

export const metadata = pageMetadata({
  title: demo.metaTitle,
  description: demo.metaDescription,
  path: demo.path,
  ogDescription: demo.ogDescription,
});

export default function ServerScopeDemoPage() {
  return (
    <main id="main">
      <DemoProjectIntro demo={demo}>
        <DemoLauncher demo={demo} steps={SERVERSCOPE_STEPS}>
          <ServerScopeDemo />
        </DemoLauncher>
      </DemoProjectIntro>
    </main>
  );
}
