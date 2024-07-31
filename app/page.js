/* eslint-disable import/no-unresolved */
import {
  Tab,
  TabList,
  TabPanel,
  Tabs,
} from "@/components/TabsComponent/TabsComponent";

export default function Home() {
  return (
    <main>
      <Tabs>
        <TabList>
          <Tab index={0}>Tab 1</Tab>
          <Tab index={1}>Tab 2</Tab>
          <Tab index={2}>Tab 3</Tab>
        </TabList>

        <TabPanel index={0}>Content for Tab 1</TabPanel>
        <TabPanel index={1}>Content for Tab 2</TabPanel>
        <TabPanel index={2}>Content for Tab 3</TabPanel>
      </Tabs>
    </main>
  );
}
