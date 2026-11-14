import DemoProjectIntro from "@/components/DemoProjectIntro";
import DemoLauncher from "@/components/demos/demo-launcher";
import StockwiseDemo from "@/components/demos/StockwiseDemo";
import { getDemo } from "@/lib/demos/registry";
import { STOCKWISE_STEPS } from "@/lib/demos/stockwise";
import { pageMetadata } from "@/lib/metadata";
import "@/components/demos/demos.css";
import "@/components/demos/stockwise.css";

const demo = getDemo("stockwise");

export const metadata = pageMetadata({
  title: demo.metaTitle,
  description: demo.metaDescription,
  path: demo.path,
  ogDescription: demo.ogDescription,
});

export default function StockwiseDemoPage() {
  return (
    <main id="main">
      <DemoProjectIntro demo={demo}>
        <DemoLauncher demo={demo} steps={STOCKWISE_STEPS}>
          <StockwiseDemo />
        </DemoLauncher>
      </DemoProjectIntro>
    </main>
  );
}
