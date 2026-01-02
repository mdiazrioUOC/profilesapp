import { Plus } from "lucide-react";
import Button from "react-bootstrap/Button";
 
export default function FloatingActionButton ({onClick}) {
  return (
    <Button
      size="icon"
      className="fixed bottom-8 right-8 h-16 w-16 rounded-full bg-primary hover:bg-primary/90 shadow-2xl shadow-primary/40 transition-all duration-300 hover:scale-110"
      onClick={{onClick}}
    >
      <Plus className="h-8 w-8" />
    </Button>
  );
};
