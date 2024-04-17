import { Card } from "@/components/ui/card"

export default function DashboardPage() {
  return (
    <div className="container pt-6">
      <h1 className="text-2xl font-semibold tracking-tight">Upcoming events</h1>
      <div className="grid w-full gap-4 pt-6">
        <Card className="flex p-4">
          <div className="flex w-12 flex-col items-center justify-center font-semibold leading-none">
            <p className="text-lg">22</p>
            <p className="text-xs uppercase text-muted-foreground">May</p>
          </div>
          <div className="pl-2">
            <p className="font-medium tracking-tight">
              Revere FC vs. Framingham FC
            </p>
            <span className="text-sm text-muted-foreground">
              <p>Wed, 6 - 8 PM</p>
              <p>Revere High School, 101 School St</p>
              <p>Revere, MA</p>
            </span>
          </div>
        </Card>
        <Card className="flex p-4">
          <div className="flex w-12 flex-col items-center justify-center font-semibold leading-none">
            <p className="text-lg">22</p>
            <p className="text-xs uppercase text-muted-foreground">May</p>
          </div>
          <div className="pl-2">
            <p className="font-medium tracking-tight">
              Revere FC vs. Framingham FC
            </p>
            <span className="text-sm text-muted-foreground">
              <p>Wed, 6 - 8 PM</p>
              <p>Revere High School, 101 School St</p>
              <p>Revere, MA</p>
            </span>
          </div>
        </Card>
        <Card className="flex p-4">
          <div className="flex w-12 flex-col items-center justify-center font-semibold leading-none">
            <p className="text-lg">22</p>
            <p className="text-xs uppercase text-muted-foreground">May</p>
          </div>
          <div className="pl-2">
            <p className="font-medium tracking-tight">
              Revere FC vs. Framingham FC
            </p>
            <span className="text-sm text-muted-foreground">
              <p>Wed, 6 - 8 PM</p>
              <p>Revere High School, 101 School St</p>
              <p>Revere, MA</p>
            </span>
          </div>
        </Card>
      </div>
    </div>
  )
}
