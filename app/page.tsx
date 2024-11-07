import Form from "@/components/form";
import Navbar from "@/components/navbar";
import TaskList from "@/components/task-list";
import { CardDescription, CardTitle } from "@/components/ui/card";
import {
  ResizableHandle,
  ResizablePanel,
  ResizablePanelGroup,
} from "@/components/ui/resizable";

export default function Home() {
  return (
    <div className="h-screen flex flex-col justify-between sm:px-20 md:px-20 lg:px-20 xl:px-80">
      <Navbar />
      <ResizablePanelGroup
        className="h-full w-full border rounded-sm"
        direction="vertical"
      >
        <ResizablePanel>
          <ResizablePanelGroup direction="vertical">
            <ResizablePanel>
              <div className="h-full flex flex-col justify-center p-6 space-y-4">
                <div className="space-y-2">
                  <CardTitle>Create a New Task</CardTitle>
                  <CardDescription>What's on your agenda today?</CardDescription>
                </div>
                <Form />
              </div>
            </ResizablePanel>
          </ResizablePanelGroup>
        </ResizablePanel>
        <ResizableHandle withHandle />
        <ResizablePanel className="max-w-[75vw] min-w-[30vw]">
            <div className="h-full overflow-y-auto p-6">
      <TaskList />
            </div>
        </ResizablePanel>
      </ResizablePanelGroup>
    </div>
  );
}
