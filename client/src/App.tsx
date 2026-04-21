import { Switch, Route } from "wouter";
// Version: 1.0.1-SMS-CONSENT-FIX
console.log("SMS Compliance Version: 1.0.1");
import { queryClient } from "./lib/queryClient";
import { QueryClientProvider } from "@tanstack/react-query";
import { Toaster } from "@/components/ui/toaster";
import { TooltipProvider } from "@/components/ui/tooltip";
import NotFound from "@/pages/not-found";
import Home from "@/pages/home";
import Services from "@/pages/services";
import Blog from "@/pages/blog";
import BlogPost from "@/pages/blog-post";
import About from "@/pages/about";
import FAQ from "@/pages/faq";
import Contact from "@/pages/contact";
import Gallery from "@/pages/gallery";
import ServiceAreas from "@/pages/service-areas";
import ReviewImages from "@/pages/review-images";
import Quote from "@/pages/quote";
import PricingMatrix from "@/pages/pricing-matrix";
import PrivacyPolicy from "@/pages/privacy-policy";
import TermsAndConditions from "@/pages/terms-and-conditions";
import SmsTerms from "@/pages/sms-terms";

import AdminDashboard from "@/pages/admin-dashboard";
import { Layout } from "@/components/Layout";

import Login from "@/pages/login";
import { ProtectedRoute } from "@/components/ProtectedRoute";

function Router() {
  return (
    <Switch>
      {/* Admin routes */}
      <Route path="/login" component={Login} />
      <Route path="/admin-dashboard">
        {() => <ProtectedRoute component={AdminDashboard} />}
      </Route>
      <Route path="/admin">
        {() => <ProtectedRoute component={AdminDashboard} />}
      </Route>

      {/* All other routes use the Layout with Header/Footer */}
      <Route>
        <Layout>
          <Switch>
            <Route path="/" component={Home} />
            <Route path="/services" component={Services} />
            <Route path="/blog" component={Blog} />
            <Route path="/blog/:id" component={BlogPost} />
            <Route path="/about" component={About} />
            <Route path="/faq" component={FAQ} />
            <Route path="/contact" component={Contact} />
            <Route path="/gallery" component={Gallery} />
            {/* <Route path="/service-areas" component={ServiceAreas} /> */}
            <Route path="/review-images" component={ReviewImages} />
            <Route path="/privacy-policy" component={PrivacyPolicy} />
            <Route path="/terms-and-conditions" component={TermsAndConditions} />
            <Route path="/sms-terms" component={SmsTerms} />
            <Route path="/sms" component={SmsTerms} />
            <Route path="/quote" component={Quote} />
            <Route path="/pricing" component={PricingMatrix} />
            <Route component={NotFound} />
          </Switch>
        </Layout>
      </Route>
    </Switch>
  );
}

function App() {
  return (
    <QueryClientProvider client={queryClient}>
      <TooltipProvider>
        <Toaster />
        <Router />
      </TooltipProvider>
    </QueryClientProvider>
  );
}

export default App;
