import { Bell, Briefcase, Calendar, ChevronDown } from "lucide-react";
import Button from "react-bootstrap/Button";
import FilterTabs from "./FilterTabs";

export default function InspectionHeader (){
  return (
    <div>
      <header className="flex items-center justify-between px-6 py-6">
        <h1 className="text-3xl font-bold text-foreground">Inspecciones</h1>
        <FilterTabs />
        <Button variant="ghost" size="icon" className="relative">
          <Bell className="h-6 w-6 text-foreground" />
          <span className="absolute -top-1 -right-1 h-3 w-3 bg-primary rounded-full"></span>
        </Button>
      </header>

      <div className="px-6 pb-4 space-y-3">
        <div className="bg-card rounded-2xl shadow-sm p-4 flex items-center justify-between">
          <div className="flex items-center gap-3">
            <div className="w-12 h-12 rounded-2xl bg-pink-100 flex items-center justify-center">
              <Briefcase className="w-6 h-6 text-pink-600" />
            </div>
            <div>
              <p className="text-xs text-muted-foreground">Task Group</p>
              <h3 className="font-semibold text-card-foreground">Cliente</h3>
            </div>
          </div>
          <ChevronDown className="w-5 h-5 text-foreground" />
        </div>

        <div className="bg-card rounded-2xl shadow-sm p-4 flex items-center justify-between">
          <div className="flex items-center gap-3">
            <div className="w-12 h-12 rounded-2xl bg-primary/10 flex items-center justify-center">
              <Calendar className="w-6 h-6 text-primary" />
            </div>
            <div>
              <p className="text-xs text-muted-foreground">Star Date</p>
              <h3 className="font-semibold text-card-foreground">01 May, 2022</h3>
            </div>
          </div>
          <ChevronDown className="w-5 h-5 text-foreground" />
        </div>
      </div>
    </div>
  );
};
