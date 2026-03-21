'use client';

import { useState } from 'react';
import Link from 'next/link';
import { Button } from '@/components/ui/button';
import { Card, CardContent, CardHeader, CardTitle } from '@/components/ui/card';
import { Progress } from '@/components/ui/progress';
import { Badge } from '@/components/ui/badge';
import { ContinuityRing } from '@/components/dashboard/risk-badge';
import { PATIENT_DATA } from '@/lib/data';
import {
  Activity,
  Pill,
  Calendar,
  MapPin,
  Phone,
  Bell,
  ChevronRight,
  Clock,
  CheckCircle,
  AlertTriangle,
  Heart,
  User,
  LogOut,
  Home,
  HelpCircle,
} from 'lucide-react';

// Use first patient as demo
const CURRENT_PATIENT = PATIENT_DATA[0];

// Upcoming pickup info
const NEXT_PICKUP = {
  date: CURRENT_PATIENT.nextPickupDate,
  time: '09:00 - 12:00',
  facility: CURRENT_PATIENT.facility,
  address: 'Notwane Road, Gaborone',
  phone: '+267 395 3555',
};

// Medication schedule
const MEDICATION_SCHEDULE = [
  { time: '08:00', medication: 'Rifampicin/Isoniazid FDC', dose: '150/75mg', taken: true },
  { time: '08:00', medication: 'Pyrazinamide', dose: '500mg', taken: true },
  { time: '20:00', medication: 'Pyrazinamide', dose: '500mg', taken: false },
];

// Treatment milestones
const TREATMENT_MILESTONES = [
  { label: 'Treatment Started', date: '2023-11-01', completed: true },
  { label: 'Intensive Phase Complete', date: '2024-01-31', completed: false },
  { label: 'Continuation Phase', date: '2024-02-01', completed: false },
  { label: 'Treatment Complete', date: '2024-05-01', completed: false },
];

export default function PatientPortalPage() {
  const [activeTab, setActiveTab] = useState<'home' | 'meds' | 'facility' | 'help'>('home');

  // Calculate treatment progress
  const startDate = new Date(CURRENT_PATIENT.treatmentStartDate);
  const endDate = new Date('2024-05-01');
  const now = new Date();
  const totalDays = (endDate.getTime() - startDate.getTime()) / (1000 * 60 * 60 * 24);
  const daysPassed = (now.getTime() - startDate.getTime()) / (1000 * 60 * 60 * 24);
  const progress = Math.min(Math.round((daysPassed / totalDays) * 100), 100);

  // Days until next pickup
  const pickupDate = new Date(NEXT_PICKUP.date);
  const daysUntilPickup = Math.ceil((pickupDate.getTime() - now.getTime()) / (1000 * 60 * 60 * 24));
  const isOverdue = daysUntilPickup < 0;

  return (
    <div className="flex min-h-screen flex-col bg-background">
      {/* Mobile Header */}
      <header className="sticky top-0 z-50 border-b border-border bg-card px-4 py-3 safe-area-top">
        <div className="flex items-center justify-between">
          <div className="flex items-center gap-3">
            <div className="flex h-10 w-10 items-center justify-center rounded-full bg-primary">
              <Activity className="h-5 w-5 text-primary-foreground" />
            </div>
            <div>
              <p className="text-sm font-medium">Welcome back,</p>
              <p className="font-semibold">{CURRENT_PATIENT.name}</p>
            </div>
          </div>
          <div className="flex items-center gap-2">
            <Button variant="ghost" size="icon" className="relative">
              <Bell className="h-5 w-5" />
              <span className="absolute right-1 top-1 h-2 w-2 rounded-full bg-destructive" />
            </Button>
            <Link href="/login">
              <Button variant="ghost" size="icon">
                <LogOut className="h-5 w-5" />
              </Button>
            </Link>
          </div>
        </div>
      </header>

      {/* Main Content */}
      <main className="flex-1 overflow-y-auto px-4 pb-24 pt-4">
        {activeTab === 'home' && (
          <div className="space-y-4">
            {/* Next Pickup Alert */}
            <Card className={isOverdue ? 'border-destructive bg-destructive/5' : 'border-primary bg-primary/5'}>
              <CardContent className="p-4">
                <div className="flex items-start gap-4">
                  <div
                    className={`flex h-12 w-12 shrink-0 items-center justify-center rounded-full ${
                      isOverdue ? 'bg-destructive/10' : 'bg-primary/10'
                    }`}
                  >
                    {isOverdue ? (
                      <AlertTriangle className="h-6 w-6 text-destructive" />
                    ) : (
                      <Calendar className="h-6 w-6 text-primary" />
                    )}
                  </div>
                  <div className="flex-1">
                    <p className="font-semibold">
                      {isOverdue ? 'Pickup Overdue' : 'Next Medication Pickup'}
                    </p>
                    <p className="text-2xl font-bold">
                      {isOverdue
                        ? `${Math.abs(daysUntilPickup)} days ago`
                        : daysUntilPickup === 0
                        ? 'Today'
                        : daysUntilPickup === 1
                        ? 'Tomorrow'
                        : `In ${daysUntilPickup} days`}
                    </p>
                    <p className="mt-1 text-sm text-muted-foreground">
                      {new Date(NEXT_PICKUP.date).toLocaleDateString('en-GB', {
                        weekday: 'long',
                        day: 'numeric',
                        month: 'long',
                      })}{' '}
                      | {NEXT_PICKUP.time}
                    </p>
                  </div>
                </div>
                <Button className="mt-4 w-full" variant={isOverdue ? 'destructive' : 'default'}>
                  <MapPin className="mr-2 h-4 w-4" />
                  Get Directions to Facility
                </Button>
              </CardContent>
            </Card>

            {/* Treatment Progress */}
            <Card>
              <CardHeader className="pb-2">
                <CardTitle className="flex items-center justify-between text-base">
                  <span>Your Treatment Progress</span>
                  <Heart className="h-5 w-5 text-primary" />
                </CardTitle>
              </CardHeader>
              <CardContent>
                <div className="flex items-center gap-6">
                  <ContinuityRing
                    percentage={CURRENT_PATIENT.adherenceRate}
                    size="lg"
                    label="Adherence"
                  />
                  <div className="flex-1 space-y-3">
                    <div>
                      <div className="mb-1 flex items-center justify-between text-sm">
                        <span className="text-muted-foreground">Treatment Progress</span>
                        <span className="font-medium">{progress}%</span>
                      </div>
                      <Progress value={progress} className="h-2" />
                    </div>
                    <div className="text-sm">
                      <p className="text-muted-foreground">Current Phase</p>
                      <p className="font-medium">{CURRENT_PATIENT.treatmentPhase}</p>
                    </div>
                    <div className="text-sm">
                      <p className="text-muted-foreground">Days Supply Remaining</p>
                      <p className="font-medium">{CURRENT_PATIENT.medications[0]?.daysSupply} days</p>
                    </div>
                  </div>
                </div>
              </CardContent>
            </Card>

            {/* Today's Medications */}
            <Card>
              <CardHeader className="pb-2">
                <CardTitle className="flex items-center justify-between text-base">
                  <span>{"Today's Medications"}</span>
                  <Badge variant="secondary" className="font-normal">
                    {MEDICATION_SCHEDULE.filter((m) => m.taken).length}/
                    {MEDICATION_SCHEDULE.length} taken
                  </Badge>
                </CardTitle>
              </CardHeader>
              <CardContent className="space-y-3">
                {MEDICATION_SCHEDULE.map((med, i) => (
                  <div
                    key={i}
                    className={`flex items-center gap-3 rounded-lg border p-3 ${
                      med.taken ? 'bg-success/5 border-success/20' : 'bg-muted/30'
                    }`}
                  >
                    <div
                      className={`flex h-10 w-10 shrink-0 items-center justify-center rounded-full ${
                        med.taken ? 'bg-success/10' : 'bg-muted'
                      }`}
                    >
                      {med.taken ? (
                        <CheckCircle className="h-5 w-5 text-success" />
                      ) : (
                        <Clock className="h-5 w-5 text-muted-foreground" />
                      )}
                    </div>
                    <div className="flex-1">
                      <p className="font-medium">{med.medication}</p>
                      <p className="text-sm text-muted-foreground">
                        {med.dose} at {med.time}
                      </p>
                    </div>
                    {!med.taken && (
                      <Button size="sm" variant="outline">
                        Mark Taken
                      </Button>
                    )}
                  </div>
                ))}
              </CardContent>
            </Card>

            {/* Treatment Timeline */}
            <Card>
              <CardHeader className="pb-2">
                <CardTitle className="text-base">Treatment Journey</CardTitle>
              </CardHeader>
              <CardContent>
                <div className="relative pl-6">
                  {TREATMENT_MILESTONES.map((milestone, i) => (
                    <div key={i} className="relative pb-6 last:pb-0">
                      {/* Line */}
                      {i < TREATMENT_MILESTONES.length - 1 && (
                        <div
                          className={`absolute left-[-18px] top-6 h-full w-0.5 ${
                            milestone.completed ? 'bg-primary' : 'bg-muted'
                          }`}
                        />
                      )}
                      {/* Dot */}
                      <div
                        className={`absolute left-[-24px] top-1 h-3 w-3 rounded-full border-2 ${
                          milestone.completed
                            ? 'border-primary bg-primary'
                            : 'border-muted-foreground bg-background'
                        }`}
                      />
                      <div>
                        <p className={`font-medium ${!milestone.completed && 'text-muted-foreground'}`}>
                          {milestone.label}
                        </p>
                        <p className="text-sm text-muted-foreground">{milestone.date}</p>
                      </div>
                    </div>
                  ))}
                </div>
              </CardContent>
            </Card>
          </div>
        )}

        {activeTab === 'meds' && (
          <div className="space-y-4">
            <h2 className="text-lg font-semibold">My Medications</h2>
            {CURRENT_PATIENT.medications.map((med, i) => (
              <Card key={i}>
                <CardContent className="p-4">
                  <div className="flex items-start gap-4">
                    <div className="flex h-12 w-12 shrink-0 items-center justify-center rounded-lg bg-primary/10">
                      <Pill className="h-6 w-6 text-primary" />
                    </div>
                    <div className="flex-1">
                      <p className="font-semibold">{med.name}</p>
                      <p className="text-sm text-muted-foreground">{med.dosage}</p>
                      <div className="mt-3 grid grid-cols-2 gap-3 text-sm">
                        <div>
                          <p className="text-muted-foreground">Frequency</p>
                          <p className="font-medium">{med.frequency}</p>
                        </div>
                        <div>
                          <p className="text-muted-foreground">Days Supply</p>
                          <p className="font-medium">{med.daysSupply} days</p>
                        </div>
                        <div>
                          <p className="text-muted-foreground">Refills Left</p>
                          <p className="font-medium">{med.refillsRemaining}</p>
                        </div>
                      </div>
                    </div>
                  </div>
                </CardContent>
              </Card>
            ))}

            <Card className="bg-muted/30">
              <CardContent className="p-4">
                <div className="flex items-center gap-3">
                  <AlertTriangle className="h-5 w-5 text-warning" />
                  <div>
                    <p className="font-medium">Important</p>
                    <p className="text-sm text-muted-foreground">
                      Never stop taking your TB medications without consulting your healthcare
                      provider, even if you feel better.
                    </p>
                  </div>
                </div>
              </CardContent>
            </Card>
          </div>
        )}

        {activeTab === 'facility' && (
          <div className="space-y-4">
            <h2 className="text-lg font-semibold">My Health Facility</h2>

            <Card>
              <CardContent className="p-4">
                <div className="flex items-start gap-4">
                  <div className="flex h-12 w-12 shrink-0 items-center justify-center rounded-lg bg-primary/10">
                    <MapPin className="h-6 w-6 text-primary" />
                  </div>
                  <div className="flex-1">
                    <p className="font-semibold">{NEXT_PICKUP.facility}</p>
                    <p className="text-sm text-muted-foreground">{NEXT_PICKUP.address}</p>
                    <p className="mt-2 text-sm text-muted-foreground">
                      <Phone className="mr-1 inline h-3 w-3" />
                      {NEXT_PICKUP.phone}
                    </p>
                  </div>
                </div>

                <div className="mt-4 flex gap-2">
                  <Button className="flex-1">
                    <Phone className="mr-2 h-4 w-4" />
                    Call
                  </Button>
                  <Button variant="outline" className="flex-1">
                    <MapPin className="mr-2 h-4 w-4" />
                    Directions
                  </Button>
                </div>
              </CardContent>
            </Card>

            <Card>
              <CardHeader className="pb-2">
                <CardTitle className="text-base">Opening Hours</CardTitle>
              </CardHeader>
              <CardContent>
                <div className="space-y-2 text-sm">
                  {['Monday', 'Tuesday', 'Wednesday', 'Thursday', 'Friday'].map((day) => (
                    <div key={day} className="flex justify-between">
                      <span className="text-muted-foreground">{day}</span>
                      <span className="font-medium">07:30 - 16:30</span>
                    </div>
                  ))}
                  <div className="flex justify-between">
                    <span className="text-muted-foreground">Saturday</span>
                    <span className="font-medium">08:00 - 12:00</span>
                  </div>
                  <div className="flex justify-between">
                    <span className="text-muted-foreground">Sunday</span>
                    <span className="text-muted-foreground">Closed</span>
                  </div>
                </div>
              </CardContent>
            </Card>

            <Card>
              <CardHeader className="pb-2">
                <CardTitle className="text-base">Stock Availability</CardTitle>
              </CardHeader>
              <CardContent>
                <div className="space-y-3">
                  {CURRENT_PATIENT.medications.map((med, i) => (
                    <div key={i} className="flex items-center justify-between">
                      <span className="text-sm">{med.name}</span>
                      <Badge variant="secondary" className="bg-success/10 text-success">
                        <CheckCircle className="mr-1 h-3 w-3" />
                        Available
                      </Badge>
                    </div>
                  ))}
                </div>
              </CardContent>
            </Card>
          </div>
        )}

        {activeTab === 'help' && (
          <div className="space-y-4">
            <h2 className="text-lg font-semibold">Help & Support</h2>

            <Card>
              <CardContent className="p-4">
                <p className="mb-4 text-sm text-muted-foreground">
                  Need help with your treatment or have questions? Contact your healthcare team.
                </p>
                <Button className="w-full">
                  <Phone className="mr-2 h-4 w-4" />
                  Call My Health Facility
                </Button>
              </CardContent>
            </Card>

            <div className="space-y-2">
              {[
                { label: 'Understanding TB Treatment', icon: HelpCircle },
                { label: 'Medication Side Effects', icon: AlertTriangle },
                { label: 'Missed Dose - What to Do', icon: Clock },
                { label: 'Treatment FAQs', icon: HelpCircle },
              ].map((item, i) => (
                <Button
                  key={i}
                  variant="outline"
                  className="w-full justify-between text-left"
                  asChild
                >
                  <div>
                    <span className="flex items-center gap-2">
                      <item.icon className="h-4 w-4" />
                      {item.label}
                    </span>
                    <ChevronRight className="h-4 w-4" />
                  </div>
                </Button>
              ))}
            </div>

            <Card className="bg-primary/5 border-primary/20">
              <CardContent className="p-4">
                <p className="font-medium">Emergency Helpline</p>
                <p className="text-2xl font-bold text-primary">0800 MED HELP</p>
                <p className="mt-1 text-sm text-muted-foreground">
                  Available 24/7 for urgent medical concerns
                </p>
              </CardContent>
            </Card>

            <div className="pt-4 text-center text-sm text-muted-foreground">
              <p>MedSight Botswana</p>
              <p>Ministry of Health & Central Medical Stores</p>
            </div>
          </div>
        )}
      </main>

      {/* Mobile Navigation Bar */}
      <nav className="fixed inset-x-0 bottom-0 z-50 border-t border-border bg-card safe-area-bottom">
        <div className="flex items-center justify-around py-2">
          {[
            { id: 'home', icon: Home, label: 'Home' },
            { id: 'meds', icon: Pill, label: 'Medications' },
            { id: 'facility', icon: MapPin, label: 'Facility' },
            { id: 'help', icon: HelpCircle, label: 'Help' },
          ].map((item) => (
            <button
              key={item.id}
              onClick={() => setActiveTab(item.id as typeof activeTab)}
              className={`flex flex-col items-center gap-1 px-4 py-2 ${
                activeTab === item.id ? 'text-primary' : 'text-muted-foreground'
              }`}
            >
              <item.icon className="h-5 w-5" />
              <span className="text-xs font-medium">{item.label}</span>
            </button>
          ))}
        </div>
      </nav>
    </div>
  );
}
