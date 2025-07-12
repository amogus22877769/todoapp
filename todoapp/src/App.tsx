import {
    Card,
    CardContent, CardDescription,
    CardFooter,
    CardHeader,
    CardTitle,
} from "@/components/ui/card"
import {
    Popover,
    PopoverContent,
    PopoverTrigger,
} from "@/components/ui/popover"
import {Button} from "@/components/ui/button.tsx";
import {type ReactNode, useState} from "react";
import {Label} from "@/components/ui/label.tsx";
import {Checkbox} from "@/components/ui/checkbox.tsx";
import {Input} from "@/components/ui/input.tsx";
import {PopoverClose} from "@radix-ui/react-popover";
import {Trash} from 'lucide-react';

function App() {
  const [tasks, setTasks] = useState<string[]>([]);
  const [currentTask, setCurrentTask] = useState<string>("");
  return (
      <div className="flex min-h-svh w-full items-center justify-center p-6 md:p-10">
          <div className="w-full max-w-sm">
              <Card>
                  <CardHeader>
                      <CardTitle>Tasks</CardTitle>
                      {tasks.length === 0 && <CardDescription>Click on New task to create your first task!</CardDescription>}
                  </CardHeader>
                  <CardContent className="space-y-4">
                      {tasks.map((task: string, index: number): ReactNode =>
                          <>
                              <Label className="relative">
                                  <Checkbox />
                                  {task}
                                  <Button variant="outline" className="absolute right-0 w-6 h-6" onClick={(): void => {
                                      const newTasks = [...tasks];
                                      newTasks.splice(index, 1);
                                      setTasks(newTasks);
                                  }}>
                                      <Trash className="w-3 h-3" />
                                  </Button>
                              </Label>
                          </>
                      )}
                  </CardContent>
                  <CardFooter>
                      <Popover>
                          <PopoverTrigger>
                              <Button>New task</Button>
                          </PopoverTrigger>
                          <PopoverContent className="w-80"> {/* Added fixed width */}
                              <div className="flex flex-col space-y-3"> {/* Changed to vertical flex */}
                                  <div className="flex flex-col space-y-2"> {/* Nested vertical flex for input+error */}
                                      <Input
                                          value={currentTask}
                                          onChange={(e) => setCurrentTask(e.target.value)}
                                          placeholder="Enter task name"
                                      />
                                      {currentTask.trim() === "" && (
                                          <p className="text-red-500 text-xs">This field is required</p>
                                      )}
                                  </div>
                                  <PopoverClose asChild>
                                      <Button
                                          disabled={currentTask.trim() === ""}
                                          onClick={() => {
                                              setTasks([...tasks, currentTask]);
                                              setCurrentTask('');
                                          }}
                                      >
                                          Confirm
                                      </Button>
                                  </PopoverClose>
                              </div>
                          </PopoverContent>
                      </Popover>
                  </CardFooter>
              </Card>
          </div>
      </div>
  )
}

export default App
