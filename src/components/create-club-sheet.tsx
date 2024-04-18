"use client"

import { Button } from "@/components/ui/button"
import {
  Form,
  FormControl,
  FormField,
  FormItem,
  FormLabel,
  FormMessage,
} from "@/components/ui/form"
import { Input } from "@/components/ui/input"
import {
  Sheet,
  SheetContent,
  SheetHeader,
  SheetTitle,
  SheetTrigger,
} from "@/components/ui/sheet"
import { zodResolver } from "@hookform/resolvers/zod"
import { useForm } from "react-hook-form"
import { z } from "zod"

import { createClubFormSchema } from "@/../types/guate"
import { createClub } from "@/app/(protected)/admin/clubs/actions"
import { useRouter } from "next/navigation"
import React from "react"

export function CreateClubSheet() {
  const router = useRouter()
  const [open, setOpen] = React.useState(false)

  const form = useForm<z.infer<typeof createClubFormSchema>>({
    resolver: zodResolver(createClubFormSchema),
    defaultValues: {
      name: "",
    },
  })

  const onSubmit = async (values: z.infer<typeof createClubFormSchema>) => {
    setOpen(false)
    await createClub(values)
    router.push("/admin/clubs")
    router.refresh()
  }

  return (
    <Sheet open={open} onOpenChange={setOpen}>
      <SheetTrigger asChild>
        <Button onClick={() => setOpen(!open)}>Create club</Button>
      </SheetTrigger>
      <SheetContent className="w-full">
        <SheetHeader>
          <SheetTitle>Create club</SheetTitle>
          {/* TODO: Write some description about this form... */}
          {/* <SheetDescription>
                Some description here
              </SheetDescription> */}
          <Form {...form}>
            <form onSubmit={form.handleSubmit(onSubmit)} className="space-y-8">
              <FormField
                control={form.control}
                name="name"
                render={({ field }) => (
                  <FormItem>
                    <FormLabel>Name</FormLabel>
                    <FormControl>
                      <Input placeholder="Revere FC" {...field} />
                    </FormControl>
                    <FormMessage />
                  </FormItem>
                )}
              />
              <Button type="submit" className="w-full">
                Create
              </Button>
            </form>
          </Form>
        </SheetHeader>
      </SheetContent>
    </Sheet>
  )
}
