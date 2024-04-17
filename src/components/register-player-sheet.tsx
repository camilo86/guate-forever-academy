"use client"

import { DatePicker } from "@/components/date-picker"
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
import { FaFutbol } from "react-icons/fa"
import { z } from "zod"

import { createPlayerFormSchema } from "@/../types/guate"

export function RegisterPlayerSheet() {
  // Tomorrow's date is used as the default birthday.
  // This value is not valid, so a user that tries to submit the form
  // with this default value will get an error and be forced to pick a
  // date in the past.
  const tomorrow = new Date()
  tomorrow.setDate(tomorrow.getDate() + 1)

  const form = useForm<z.infer<typeof createPlayerFormSchema>>({
    resolver: zodResolver(createPlayerFormSchema),
    defaultValues: {
      name: "",
      birthday: tomorrow,
    },
  })

  const onSubmit = (values: z.infer<typeof createPlayerFormSchema>) => {
    console.log(values)
  }

  return (
    <Sheet>
      <SheetTrigger asChild>
        <Button>
          <FaFutbol className="mr-2" /> Register player
        </Button>
      </SheetTrigger>
      <SheetContent className="w-full">
        <SheetHeader>
          <SheetTitle>Register new player</SheetTitle>
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
                      <Input placeholder="Leo Messi" {...field} />
                    </FormControl>
                    <FormMessage />
                  </FormItem>
                )}
              />
              <FormField
                control={form.control}
                name="birthday"
                render={({ field }) => (
                  <FormItem>
                    <FormLabel>Birthday</FormLabel>
                    <FormControl>
                      <DatePicker
                        date={field.value}
                        onChange={field.onChange}
                      />
                    </FormControl>
                    <FormMessage />
                  </FormItem>
                )}
              />
              <Button type="submit" className="w-full">
                Register
              </Button>
            </form>
          </Form>
        </SheetHeader>
      </SheetContent>
    </Sheet>
  )
}
