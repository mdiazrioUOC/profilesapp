import { Briefcase, Clock } from "lucide-react";
import { cn } from "@/lib/utils";

const statusConfig = {
  done: { label: "Done", className: "bg-success-light text-success" },
  "in-progress": { label: "In Progress", className: "bg-warning-light text-warning" },
  "to-do": { label: "To-do", className: "bg-info-light text-info" },
};

export default function ClientCard ({ name, date, status, description, iconColor }) {
  return (
    <div className="bg-card rounded-2xl shadow-sm p-4 mb-4">
      <div className="flex items-start justify-between">
        <div className="flex-1">
          {description && (
            <p className="text-sm text-muted-foreground mb-1">{description}</p>
          )}
          <h4 className="font-bold text-card-foreground mb-2">{name}</h4>
          <div className="flex items-center gap-2 text-sm text-muted-foreground">
            <Clock className="w-4 h-4 text-primary/60" />
            <span>{date}</span>
          </div>
        </div>
        <div className="flex flex-col items-end gap-2">
          <div className={cn("w-10 h-10 rounded-xl flex items-center justify-center", iconColor)}>
            <Briefcase className="w-5 h-5" />
          </div>
          <span className={cn("px-3 py-1 rounded-lg text-xs font-medium", statusConfig[status].className)}>
            {statusConfig[status].label}
          </span>
        </div>
      </div>
    </div>
  );
}
