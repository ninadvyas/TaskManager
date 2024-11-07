"use client";

import React, { useState } from "react";
import { VscLoading } from "react-icons/vsc";
import {
  Form as FormComp,
  FormControl,
  FormField,
  FormItem,
  FormMessage,
} from "../ui/form";
import { SubmitHandler, useForm } from "react-hook-form";
import { zodResolver } from "@hookform/resolvers/zod";
import formSchema, { FormSchema, TaskStatus } from "./schema";
import { Input } from "../ui/input";
import {
  Select,
  SelectContent,
  SelectValue,
  SelectTrigger,
  SelectItem,
} from "../ui/select";
import StatusBullet from "../StatusBullet";
import { Textarea } from "../ui/textarea";
import { Button } from "../ui/button";
import { IoAddOutline } from "react-icons/io5";
import { createTask, deleteTask, updateTask } from "@/services/task";
import { useToast } from "@/hooks/use-toast";
import { Task } from "@prisma/client";
import { CalendarIcon } from "lucide-react";
type Props = {
  task?: Task;
  onSubmitOrDelete?: () => void;
};

export default function Form(props: Props) {
  const { task, onSubmitOrDelete } = props;
  const isEditing = !!task;

  const form = useForm<FormSchema>({
    resolver: zodResolver(formSchema),
    defaultValues: isEditing
      ? {
          title: task.title,
          description: task.description || "",
          status: task.status as TaskStatus,
        }
      : {
          title: "",
          description: "",
          status: "starting" as TaskStatus,
        },
  });

  const { toast } = useToast();
  const [isLoading, setIsLoading] = useState(false);

  const onSubmit: SubmitHandler<FormSchema> = async (data: FormSchema) => {
    setIsLoading(true);
    if (!isEditing) {
      await createTask(data);
    } else {
      const newTask = {
        id: task.id,
        createdAt: task.createdAt,
        description: data.description,
        status: data.status,
        title: data.title,
      } as Task;
      await updateTask(newTask);
    }
    setIsLoading(false);
    toast({
      title: isEditing
        ? "Your task was edited successfully!"
        : "Your new task was created successfully!",
    });
    onSubmitOrDelete?.();
  };

  const onDelete = async () => {
    if (!task?.id) return;
    await deleteTask(task.id);
    onSubmitOrDelete?.()
  };
  return (
    <FormComp {...form}>
      <form onSubmit={form.handleSubmit(onSubmit)} className="space-y-2">
        <div className="flex items-center gap-3">
          <FormField
            control={form.control}
            name="title"
            render={({ field }) => (
              <FormItem className="grow">
                <FormMessage />
                <FormControl>
                  <Input placeholder="Task Name" {...field} />
                </FormControl>
              </FormItem>
            )}
          />
          <FormField
            control={form.control}
            name="status"
            render={({ field }) => (
              <FormItem className="grow">
                <FormMessage />
                <Select
                  onValueChange={field.onChange}
                  defaultValue={field.value}
                >
                  <FormControl>
                    <SelectTrigger>
                      <SelectValue placeholder="Status" />
                    </SelectTrigger>
                  </FormControl>
                  <SelectContent>
                    <SelectItem value="starting">
                      <StatusBullet status="starting" />
                    </SelectItem>
                    <SelectItem value="progress">
                      <StatusBullet status="progress" />
                    </SelectItem>
                    <SelectItem value="done">
                      <StatusBullet status="done" />
                    </SelectItem>
                  </SelectContent>
                </Select>
              </FormItem>
            )}
          />
          {isEditing ? null : (
            <Button
              type="submit"
            >
              Add Task
            </Button>
          )}
        </div>
        <FormField
          control={form.control}
          name="description"
          render={({ field }) => (
            <FormItem>
              <FormMessage />
              <FormControl>
                <Textarea
                  placeholder="Description"
                  className="resize-none"
                  {...field}
                />
              </FormControl>
            </FormItem>
          )}
        />
        {isEditing ? (
          <div className="flex items-center gap-2">
            <Button type="submit" disabled={isLoading}>
              Save Changes
            </Button>
            <Button
              variant="destructive"
              onClick={onDelete}
              disabled={isLoading}
            >
              Delete
            </Button>
            <Button
              variant={"outline"}
              className="flex items-center gap-2 cursor-not-allowed	"
            >
              <CalendarIcon className="ml-auto h-4 w-4 opacity-50" />
            </Button>
          </div>
        ) : null}
      </form>
    </FormComp>
  );
}
