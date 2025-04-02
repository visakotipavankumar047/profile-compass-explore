
import React from "react";
import { Link, useLocation, useNavigate } from "react-router-dom";
import { Button } from "@/components/ui/button";
import {
  NavigationMenu,
  NavigationMenuItem,
  NavigationMenuLink,
  NavigationMenuList,
  navigationMenuTriggerStyle,
} from "@/components/ui/navigation-menu";
import { UserCircle, Users, Map, Settings, Menu, X } from "lucide-react";
import { Sheet, SheetContent, SheetTrigger } from "@/components/ui/sheet";
import { cn } from "@/lib/utils";

interface LayoutProps {
  children: React.ReactNode;
}

const Layout: React.FC<LayoutProps> = ({ children }) => {
  const location = useLocation();
  const [open, setOpen] = React.useState(false);
  
  const isActive = (path: string) => {
    if (path === "/") {
      return location.pathname === "/";
    }
    return location.pathname.startsWith(path);
  };

  const navigationItems = [
    { path: "/", label: "Profiles", icon: <Users size={18} className="mr-2" /> },
    { path: "/admin", label: "Admin", icon: <Settings size={18} className="mr-2" /> },
  ];

  return (
    <div className="min-h-screen flex flex-col">
      <header className="border-b sticky top-0 z-30 bg-background">
        <div className="container mx-auto px-4 py-4 flex items-center justify-between">
          <div className="flex items-center">
            <Link to="/" className="flex items-center gap-2 text-lg font-semibold">
              <Map className="h-6 w-6 text-primary" />
              <span>Profile Compass</span>
            </Link>
          </div>

          {/* Desktop navigation */}
          <div className="hidden md:flex items-center space-x-4">
            <NavigationMenu>
              <NavigationMenuList>
                {navigationItems.map((item) => (
                  <NavigationMenuItem key={item.path}>
                    <Link to={item.path}>
                      <NavigationMenuLink 
                        className={cn(
                          navigationMenuTriggerStyle(), 
                          "flex items-center",
                          isActive(item.path) && "bg-accent text-accent-foreground"
                        )}
                      >
                        {item.icon}
                        {item.label}
                      </NavigationMenuLink>
                    </Link>
                  </NavigationMenuItem>
                ))}
              </NavigationMenuList>
            </NavigationMenu>
            
            <Button variant="outline" size="icon" asChild>
              <Link to="/profile/profile-1" className="rounded-full">
                <UserCircle className="h-5 w-5" />
              </Link>
            </Button>
          </div>
          
          {/* Mobile navigation */}
          <Sheet open={open} onOpenChange={setOpen}>
            <SheetTrigger asChild className="md:hidden">
              <Button variant="ghost" size="icon">
                <Menu className="h-6 w-6" />
                <span className="sr-only">Toggle menu</span>
              </Button>
            </SheetTrigger>
            <SheetContent side="right">
              <div className="flex flex-col h-full">
                <div className="flex items-center justify-between py-4">
                  <div className="flex items-center gap-2 text-lg font-semibold">
                    <Map className="h-6 w-6 text-primary" />
                    <span>Profile Compass</span>
                  </div>
                  <Button variant="ghost" size="icon" onClick={() => setOpen(false)}>
                    <X className="h-5 w-5" />
                  </Button>
                </div>
                
                <nav className="flex flex-col space-y-1 mt-4">
                  {navigationItems.map((item) => (
                    <Button
                      key={item.path}
                      variant={isActive(item.path) ? "default" : "ghost"}
                      className="justify-start"
                      asChild
                      onClick={() => setOpen(false)}
                    >
                      <Link to={item.path}>
                        {item.icon}
                        {item.label}
                      </Link>
                    </Button>
                  ))}
                </nav>
              </div>
            </SheetContent>
          </Sheet>
        </div>
      </header>

      <main className="flex-1">{children}</main>

      <footer className="border-t py-6 bg-muted/40">
        <div className="container mx-auto px-4 text-center text-sm text-muted-foreground">
          <p>© 2023 Profile Compass. All rights reserved.</p>
        </div>
      </footer>
    </div>
  );
};

export default Layout;
