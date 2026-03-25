/**
 * @license
 * SPDX-License-Identifier: Apache-2.0
 */

import React, { useState, useMemo } from 'react';
import { 
  Home, 
  Wallet, 
  BarChart3, 
  User, 
  PlusCircle, 
  ArrowLeft, 
  Utensils, 
  Car, 
  ShoppingBag, 
  ReceiptText, 
  Dumbbell, 
  MoreHorizontal,
  Calendar as CalendarIcon,
  Pencil,
  CheckCircle2,
  Sparkles,
  PiggyBank,
  TrendingDown,
  Notebook,
  Search,
  Filter as FilterIcon,
  ChevronRight
} from 'lucide-react';
import { motion, AnimatePresence } from 'motion/react';
import { format, isToday, isYesterday } from 'date-fns';
import { 
  LineChart, 
  Line, 
  XAxis, 
  YAxis, 
  CartesianGrid, 
  Tooltip, 
  ResponsiveContainer,
  PieChart,
  Pie,
  Cell
} from 'recharts';
import { cn } from './lib/utils';
import { Transaction, Category } from './types';
import { INITIAL_TRANSACTIONS, CATEGORIES } from './constants';

type Page = 'home' | 'accounts' | 'statistics' | 'profile' | 'add';

export default function App() {
  const [currentPage, setCurrentPage] = useState<Page>('home');
  const [transactions, setTransactions] = useState<Transaction[]>(INITIAL_TRANSACTIONS);

  const addTransaction = (t: Transaction) => {
    setTransactions([t, ...transactions]);
    setCurrentPage('home');
  };

  return (
    <div className="min-h-screen flex flex-col md:flex-row">
      {/* Sidebar - Desktop */}
      <aside className="hidden md:flex fixed left-0 top-0 h-screen w-64 flex-col p-4 z-40 bg-surface-container rounded-r-[2.5rem] shadow-[8px_0px_24px_rgba(60,57,20,0.06)]">
        <div className="mb-10 px-4 pt-6">
          <h1 className="text-xl font-bold text-on-background font-headline">Daily Journal</h1>
          <p className="text-xs opacity-60 italic">Your financial story</p>
        </div>
        
        <nav className="flex flex-col gap-2 flex-grow">
          <NavItem 
            active={currentPage === 'home'} 
            onClick={() => setCurrentPage('home')}
            icon={<Home size={20} />}
            label="Home"
          />
          <NavItem 
            active={currentPage === 'accounts'} 
            onClick={() => setCurrentPage('accounts')}
            icon={<Wallet size={20} />}
            label="Accounts"
          />
          <NavItem 
            active={currentPage === 'statistics'} 
            onClick={() => setCurrentPage('statistics')}
            icon={<BarChart3 size={20} />}
            label="Statistics"
          />
          <NavItem 
            active={currentPage === 'profile'} 
            onClick={() => setCurrentPage('profile')}
            icon={<User size={20} />}
            label="Profile"
          />
        </nav>

        <div className="mt-auto p-4 flex flex-col gap-4">
          <button 
            onClick={() => setCurrentPage('add')}
            className="bg-gradient-to-br from-primary to-primary-container text-on-primary py-3 px-6 rounded-[1.2rem_0.8rem_1.4rem_1rem] font-bold shadow-md hover:scale-105 transition-transform flex items-center justify-center gap-2"
          >
            <PlusCircle size={20} />
            Add Entry
          </button>
          
          <div className="flex items-center gap-3 pt-4 border-t border-outline-variant/20">
            <div className="w-10 h-10 rounded-full bg-tertiary-container overflow-hidden ring-2 ring-white">
              <img 
                src="https://picsum.photos/seed/avatar/100/100" 
                alt="User" 
                className="w-full h-full object-cover"
                referrerPolicy="no-referrer"
              />
            </div>
            <div className="text-xs">
              <p className="font-bold">Happy Saver</p>
              <p className="opacity-60">Level 5 Planner</p>
            </div>
          </div>
        </div>
      </aside>

      {/* Mobile Nav */}
      <nav className="md:hidden fixed bottom-0 left-0 w-full bg-surface-container flex justify-around items-center p-4 z-50 border-t border-outline-variant/20">
        <MobileNavItem active={currentPage === 'home'} onClick={() => setCurrentPage('home')} icon={<Home size={24} />} label="Home" />
        <MobileNavItem active={currentPage === 'accounts'} onClick={() => setCurrentPage('accounts')} icon={<Wallet size={24} />} label="Accounts" />
        <div className="relative -top-6">
          <button 
            onClick={() => setCurrentPage('add')}
            className="w-14 h-14 bg-primary text-white rounded-full shadow-lg flex items-center justify-center border-4 border-background"
          >
            <PlusCircle size={32} />
          </button>
        </div>
        <MobileNavItem active={currentPage === 'statistics'} onClick={() => setCurrentPage('statistics')} icon={<BarChart3 size={24} />} label="Stats" />
        <MobileNavItem active={currentPage === 'profile'} onClick={() => setCurrentPage('profile')} icon={<User size={24} />} label="Profile" />
      </nav>

      {/* Main Content */}
      <main className="flex-1 md:ml-64 p-6 md:p-12 max-w-6xl mx-auto w-full pb-24 md:pb-12">
        <AnimatePresence mode="wait">
          {currentPage === 'home' && (
            <HomePage key="home" transactions={transactions} />
          )}
          {currentPage === 'add' && (
            <AddEntryPage key="add" onAdd={addTransaction} onBack={() => setCurrentPage('home')} />
          )}
          {currentPage === 'accounts' && (
            <AccountsPage key="accounts" transactions={transactions} />
          )}
          {currentPage === 'statistics' && (
            <StatisticsPage key="statistics" transactions={transactions} />
          )}
          {currentPage === 'profile' && (
            <div key="profile" className="flex items-center justify-center h-full">
              <p className="font-handwritten text-3xl opacity-40">Profile coming soon...</p>
            </div>
          )}
        </AnimatePresence>

        <footer className="w-full mt-24 flex flex-col items-center gap-2 pb-8 border-t border-outline-variant border-dashed pt-8">
          <div className="flex items-center gap-2 mb-2">
            <Sparkles size={16} className="text-primary opacity-60" />
            <p className="font-body text-sm italic opacity-60">© 2024 The Living Journal. Sketched with love.</p>
          </div>
          <div className="flex gap-4 text-sm italic opacity-60">
            <a href="#" className="hover:text-primary transition-colors underline decoration-wavy decoration-primary-fixed">Privacy</a>
            <a href="#" className="hover:text-primary transition-colors">Terms</a>
            <a href="#" className="hover:text-primary transition-colors">Support</a>
          </div>
        </footer>
      </main>
    </div>
  );
}

function NavItem({ active, onClick, icon, label }: { active: boolean, onClick: () => void, icon: React.ReactNode, label: string }) {
  return (
    <button 
      onClick={onClick}
      className={cn(
        "flex items-center gap-3 p-3 transition-all duration-200 active:scale-95 w-full text-left",
        active 
          ? "bg-tertiary-container text-tertiary rounded-[1.2rem_1.5rem_1.1rem_1.4rem] rotate-1 shadow-sm font-bold" 
          : "text-on-background opacity-70 hover:rotate-[-1deg] hover:bg-surface-container-low"
      )}
    >
      {icon}
      <span>{label}</span>
    </button>
  );
}

function MobileNavItem({ active, onClick, icon, label }: { active: boolean, onClick: () => void, icon: React.ReactNode, label: string }) {
  return (
    <button 
      onClick={onClick}
      className={cn(
        "flex flex-col items-center gap-1 transition-all",
        active ? "text-primary" : "text-on-surface opacity-70"
      )}
    >
      {icon}
      <span className="text-[10px] font-bold">{label}</span>
    </button>
  );
}

function HomePage({ transactions, key }: { transactions: Transaction[], key?: React.Key }) {
  const balance = transactions.reduce((acc, t) => t.type === 'income' ? acc + t.amount : acc - t.amount, 0);
  const income = transactions.filter(t => t.type === 'income').reduce((acc, t) => acc + t.amount, 0);
  const expenses = transactions.filter(t => t.type === 'expense').reduce((acc, t) => acc + t.amount, 0);

  return (
    <motion.div 
      initial={{ opacity: 0, y: 20 }}
      animate={{ opacity: 1, y: 0 }}
      exit={{ opacity: 0, y: -20 }}
      className="space-y-12"
    >
      <header className="flex flex-col md:flex-row md:items-end justify-between gap-6">
        <div className="space-y-2">
          <div className="flex items-center gap-3">
            <h2 className="font-headline text-4xl font-extrabold text-on-background tracking-tight">Hello, Happy Saver!</h2>
            <div className="relative sticker-effect p-1 bg-white rounded-full rotate-12">
              <Sparkles className="text-yellow-500" size={24} />
            </div>
          </div>
          <p className="text-lg text-on-surface-variant italic font-body">Today is a beautiful day to grow your forest of savings. 🌿</p>
        </div>
        <div className="hidden md:block">
          <div className="bg-surface-container-high px-4 py-2 rounded-full border-2 border-dashed border-outline-variant flex items-center gap-2 rotate-2">
            <CalendarIcon size={18} className="text-primary" />
            <span className="font-bold text-sm">{format(new Date(), 'MMMM d, yyyy')}</span>
          </div>
        </div>
      </header>

      <div className="grid grid-cols-1 md:grid-cols-3 gap-8">
        {/* Balance Card */}
        <section className="md:col-span-2 bg-surface-container p-8 sketchy-card relative overflow-hidden group">
          <div className="absolute top-0 right-0 p-4 opacity-10 group-hover:opacity-20 transition-opacity">
            <PiggyBank size={180} className="-rotate-12" />
          </div>
          <div className="relative z-10">
            <div className="flex items-center gap-4 mb-6">
              <div className="p-3 bg-primary-container rounded-2xl rotate-[-3deg] shadow-sm sticker-effect">
                <PiggyBank size={32} className="text-on-primary-container" />
              </div>
              <h3 className="font-headline text-xl font-bold">This Month's Balance</h3>
            </div>
            <div className="flex flex-col gap-1">
              <span className="text-5xl md:text-7xl font-headline font-black text-primary italic">
                ${balance.toLocaleString(undefined, { minimumFractionDigits: 2 })}
              </span>
              <div className="flex items-center gap-2 text-secondary font-bold">
                <TrendingDown size={20} className="rotate-180" />
                <span>+12% from last month</span>
              </div>
            </div>
            <div className="mt-8 grid grid-cols-2 gap-4">
              <div className="bg-white/50 p-4 rounded-xl border border-dashed border-outline-variant hover:bg-white transition-colors">
                <p className="text-xs uppercase tracking-wider opacity-60 font-bold">Income</p>
                <p className="text-xl font-bold text-green-700">${income.toLocaleString()}</p>
              </div>
              <div className="bg-white/50 p-4 rounded-xl border border-dashed border-outline-variant hover:bg-white transition-colors">
                <p className="text-xs uppercase tracking-wider opacity-60 font-bold">Expenses</p>
                <p className="text-xl font-bold text-error">${expenses.toLocaleString()}</p>
              </div>
            </div>
          </div>
        </section>

        {/* Budget Progress */}
        <section className="bg-surface-container-low p-8 wobbly-border rotate-1">
          <h3 className="font-headline text-xl font-bold mb-6 flex items-center gap-2">
            <Pencil size={20} className="text-primary" />
            Budget Progress
          </h3>
          <div className="space-y-8">
            <BudgetBar label="Groceries" spent={420} limit={600} color="bg-primary-container" />
            <BudgetBar label="Fun Money" spent={150} limit={200} color="bg-tertiary-container" />
            <div className="pt-4 border-t border-outline-variant border-dashed">
              <p className="text-sm italic opacity-80 text-center">"Small leaks sink a great ship. Keep it up!"</p>
            </div>
          </div>
        </section>

        {/* Recent Activities */}
        <section className="md:col-span-3 bg-surface-container-highest p-8 wobbly-border -rotate-1">
          <div className="flex justify-between items-center mb-8">
            <h3 className="font-headline text-2xl font-black italic flex items-center gap-3">
              <Pencil size={24} className="text-primary" />
              Recent Activities
            </h3>
            <button className="text-sm font-bold underline decoration-wavy decoration-primary-fixed hover:text-primary transition-colors">See all logs</button>
          </div>
          <div className="grid grid-cols-1 md:grid-cols-3 gap-6">
            {transactions.slice(0, 3).map(t => (
              <TransactionItem key={t.id} transaction={t} />
            ))}
          </div>
        </section>

        {/* Side Notes */}
        <section className="md:col-span-1 bg-white p-6 sketchy-card flex flex-col gap-4">
          <div className="flex items-center gap-2 mb-2">
            <Notebook size={20} className="text-primary" />
            <h3 className="font-headline font-bold">Side Notes</h3>
          </div>
          <div className="space-y-4">
            <p className="text-sm italic leading-relaxed text-on-surface-variant">
              "Remember to cancel that gym membership trial before Friday! You can do it! ✨"
            </p>
            <div className="flex justify-center py-4">
              <img 
                src="https://picsum.photos/seed/doodle/150/150" 
                alt="Doodle" 
                className="opacity-80 hover:opacity-100 transition-all w-32 h-32 sticker-effect rounded-2xl"
                referrerPolicy="no-referrer"
              />
            </div>
          </div>
        </section>

        {/* Vacation Fund */}
        <section className="md:col-span-2 bg-secondary-container p-8 wobbly-border flex flex-col md:flex-row items-center gap-8 overflow-hidden relative">
          <div className="flex-1 space-y-4 relative z-10">
            <h3 className="font-headline text-2xl font-bold">The Great Vacation Fund</h3>
            <p className="text-on-secondary-container">You're 85% of the way to your Japan trip! Just $300 more to go for that Ramen spree.</p>
            <button className="bg-on-secondary-container text-white px-6 py-2 rounded-full font-bold text-sm hover:scale-105 transition-transform">Transfer Now</button>
          </div>
          <div className="w-48 h-48 bg-white/30 rounded-full flex items-center justify-center p-4 border-4 border-dashed border-white/50 relative z-10">
            <img 
              src="https://picsum.photos/seed/japan/150/150" 
              alt="Japan Goal" 
              className="w-32 h-32 sticker-effect rounded-full"
              referrerPolicy="no-referrer"
            />
          </div>
        </section>
      </div>
    </motion.div>
  );
}

function BudgetBar({ label, spent, limit, color }: { label: string, spent: number, limit: number, color: string }) {
  const percent = Math.min((spent / limit) * 100, 100);
  return (
    <div>
      <div className="flex justify-between mb-2 text-sm font-bold">
        <span>{label}</span>
        <span>${spent} / ${limit}</span>
      </div>
      <div className="h-6 w-full bg-white rounded-full border-2 border-on-background relative overflow-hidden">
        <div className={cn("h-full border-r-4 border-on-background transition-all duration-1000", color)} style={{ width: `${percent}%` }}></div>
      </div>
    </div>
  );
}

function TransactionItem({ transaction, key }: { transaction: Transaction, key?: React.Key }) {
  const Icon = useMemo(() => {
    const cat = CATEGORIES.find(c => c.name === transaction.category);
    if (transaction.category === 'Income') return Wallet;
    if (transaction.category === 'Savings') return Sparkles;
    switch(transaction.category) {
      case 'Food': return Utensils;
      case 'Transport': return Car;
      case 'Shopping': return ShoppingBag;
      case 'Bills': return ReceiptText;
      case 'Health': return Dumbbell;
      default: return MoreHorizontal;
    }
  }, [transaction.category]);

  const color = CATEGORIES.find(c => c.name === transaction.category)?.color || '#A0A0A0';

  return (
    <div className="bg-white p-6 rounded-[2rem] flex items-center gap-5 border-b-4 border-r-4 border-outline-variant/30 hover:-translate-y-1 transition-transform group">
      <div 
        className="w-16 h-16 rounded-full flex items-center justify-center sticker-effect transition-transform group-hover:rotate-6"
        style={{ backgroundColor: `${color}20`, borderColor: color }}
      >
        <Icon size={32} style={{ color }} />
      </div>
      <div className="flex-1">
        <h4 className="font-bold text-lg leading-tight">{transaction.title}</h4>
        <p className="text-sm opacity-60">
          {isToday(transaction.date) ? 'Today' : isYesterday(transaction.date) ? 'Yesterday' : format(transaction.date, 'MMM d')}
        </p>
      </div>
      <div className="text-right">
        <p className={cn("font-headline font-black text-lg", transaction.type === 'income' ? "text-primary" : "text-error")}>
          {transaction.type === 'income' ? '+' : '-'}${transaction.amount.toFixed(2)}
        </p>
        <p className="text-[10px] uppercase font-bold opacity-40">{transaction.category}</p>
      </div>
    </div>
  );
}

function AddEntryPage({ onAdd, onBack, key }: { onAdd: (t: Transaction) => void, onBack: () => void, key?: React.Key }) {
  const [amount, setAmount] = useState('');
  const [category, setCategory] = useState<Category>('Food');
  const [notes, setNotes] = useState('');

  const handleSubmit = () => {
    if (!amount) return;
    onAdd({
      id: Math.random().toString(36).substr(2, 9),
      title: notes || `Spent on ${category}`,
      amount: parseFloat(amount),
      category,
      date: new Date(),
      type: 'expense',
      notes
    });
  };

  return (
    <motion.div 
      initial={{ opacity: 0, x: 20 }}
      animate={{ opacity: 1, x: 0 }}
      exit={{ opacity: 0, x: -20 }}
      className="space-y-8"
    >
      <button onClick={onBack} className="flex items-center gap-2 text-on-surface-variant hover:text-primary transition-colors group">
        <ArrowLeft className="group-hover:-translate-x-1 transition-transform" />
        <span className="font-bold underline decoration-dotted underline-offset-4">Discard Entry</span>
      </button>

      <div className="grid grid-cols-1 md:grid-cols-12 gap-8 items-start">
        {/* Amount Input */}
        <div className="md:col-span-12 bg-surface-container-low p-8 sketchy-card text-center relative overflow-hidden">
          <div className="absolute top-0 right-0 p-4 opacity-5">
            <Wallet size={120} />
          </div>
          <label className="block font-headline text-lg font-bold mb-2 text-primary">How much did you spend?</label>
          <div className="relative inline-flex items-center justify-center">
            <span className="text-4xl font-headline font-black text-on-surface opacity-40 absolute left-[-40px]">$</span>
            <input 
              type="number"
              value={amount}
              onChange={(e) => setAmount(e.target.value)}
              className="bg-transparent border-none text-7xl font-headline font-black text-on-surface focus:ring-0 placeholder:opacity-20 w-full max-w-xs text-center" 
              placeholder="0.00" 
            />
          </div>
          <div className="mt-4 flex justify-center gap-2">
            <span className="bg-secondary-container text-on-secondary-container px-4 py-1 rounded-full text-sm font-bold -rotate-1 border border-secondary/20">Personal Account</span>
          </div>
        </div>

        {/* Categories */}
        <div className="md:col-span-7 space-y-8">
          <section>
            <h3 className="font-headline text-xl font-bold mb-6 flex items-center gap-2">
              <Sparkles className="text-primary" />
              Select Category
            </h3>
            <div className="grid grid-cols-3 gap-4">
              {CATEGORIES.map((cat, i) => {
                const Icon = { Utensils, Car, ShoppingBag, ReceiptText, Dumbbell, MoreHorizontal }[cat.icon] || MoreHorizontal;
                return (
                  <button 
                    key={cat.name}
                    onClick={() => setCategory(cat.name)}
                    className={cn(
                      "group flex flex-col items-center p-4 wobbly-border transition-all",
                      category === cat.name ? "bg-primary/10 border-primary" : "bg-white/50 border-transparent hover:bg-white"
                    )}
                  >
                    <div 
                      className="w-14 h-14 flex items-center justify-center sticker-effect rounded-2xl group-hover:rotate-6 transition-transform"
                      style={{ backgroundColor: cat.color }}
                    >
                      <Icon className="text-white" size={32} />
                    </div>
                    <span className="mt-2 text-sm font-bold text-on-surface">{cat.name}</span>
                  </button>
                );
              })}
            </div>
          </section>

          <section className="bg-surface-container p-6 wobbly-border border-dashed relative overflow-hidden">
            <h3 className="font-headline text-lg font-bold mb-4 flex items-center gap-2">
              <CalendarIcon className="text-primary" />
              When did it happen?
            </h3>
            <div className="flex items-center gap-4">
              <div className="bg-white p-3 shadow-md border-2 border-outline-variant/30 rotate-[-2deg] flex flex-col items-center min-w-[80px] sticker-effect">
                <span className="text-xs font-bold text-error uppercase">{format(new Date(), 'MMM')}</span>
                <span className="text-3xl font-black">{format(new Date(), 'd')}</span>
              </div>
              <div className="flex-grow">
                <p className="font-bold text-on-surface">{format(new Date(), 'EEEE, yyyy')}</p>
                <button className="text-sm text-primary underline decoration-wavy font-bold">Change Date</button>
              </div>
            </div>
          </section>
        </div>

        {/* Notes & Save */}
        <div className="md:col-span-5 space-y-8">
          <section className="bg-surface-container-lowest p-6 sketchy-card min-h-[250px] relative overflow-hidden">
            <h3 className="font-headline text-lg font-bold mb-2 flex items-center gap-2">
              <Pencil className="text-primary" size={18} />
              Notes
            </h3>
            <textarea 
              value={notes}
              onChange={(e) => setNotes(e.target.value)}
              className="ruled-paper w-full bg-transparent border-none focus:ring-0 font-body italic text-on-surface-variant resize-none h-[180px] px-2" 
              placeholder="Lunch with the team at the corner café..."
            />
          </section>

          <div className="flex justify-center pt-4">
            <button 
              onClick={handleSubmit}
              className="group relative inline-flex items-center justify-center p-14 organic-blob bg-primary text-white transition-all hover:scale-105 active:scale-95 shadow-2xl overflow-hidden"
            >
              <div className="absolute inset-3 border-4 border-white/20 border-dashed organic-blob pointer-events-none"></div>
              <div className="flex flex-col items-center relative z-10">
                <span className="font-headline text-3xl font-black italic tracking-tighter uppercase">Save Entry</span>
                <div className="mt-2 bg-white/20 p-2 rounded-full backdrop-blur-sm group-hover:bg-white/40 transition-colors">
                  <CheckCircle2 size={32} />
                </div>
              </div>
            </button>
          </div>
        </div>
      </div>
    </motion.div>
  );
}

function AccountsPage({ transactions, key }: { transactions: Transaction[], key?: React.Key }) {
  const grouped = useMemo(() => {
    const groups: Record<string, Transaction[]> = {};
    transactions.forEach(t => {
      const key = format(t.date, 'yyyy-MM-dd');
      if (!groups[key]) groups[key] = [];
      groups[key].push(t);
    });
    return Object.entries(groups).sort((a, b) => b[0].localeCompare(a[0]));
  }, [transactions]);

  return (
    <motion.div 
      initial={{ opacity: 0, y: 20 }}
      animate={{ opacity: 1, y: 0 }}
      exit={{ opacity: 0, y: -20 }}
      className="space-y-12"
    >
      <header>
        <h1 className="font-headline text-5xl font-extrabold text-on-background tracking-tight mb-2">Spending Log</h1>
        <p className="italic text-on-surface-variant">Writing down every penny, making it count.</p>
      </header>

      <div className="flex flex-col sm:flex-row items-center gap-4">
        <div className="relative w-full sm:w-64 group">
          <input 
            className="w-full bg-surface-container-lowest wobbly-border px-4 py-2 focus:ring-0 focus:outline-none focus:border-primary transition-all text-on-surface italic" 
            placeholder="Search my notes..." 
            type="text"
          />
          <Search className="absolute right-3 top-1/2 -translate-y-1/2 text-outline-variant" size={20} />
        </div>
        <button className="bg-secondary-container text-on-secondary-container px-6 py-2 rounded-[2.5rem_1.2rem_2.2rem_1.5rem] flex items-center gap-2 font-bold hover:rotate-1 transition-transform border border-outline-variant/30 shadow-sm active:scale-95">
          <FilterIcon size={18} />
          Filter
        </button>
      </div>

      <div className="bg-surface-container-low p-8 md:p-12 wobbly-border shadow-[12px_12px_0px_#f1eba6] relative overflow-hidden">
        <div className="absolute left-0 top-0 bottom-0 w-4 bg-primary/5 border-r border-dashed border-primary/20"></div>
        <div className="ml-4 space-y-12">
          {grouped.map(([date, items]) => (
            <section key={date}>
              <div className="flex items-center gap-4 mb-6">
                <h2 className="font-headline text-2xl font-bold text-primary">
                  {isToday(new Date(date)) ? 'Today' : isYesterday(new Date(date)) ? 'Yesterday' : format(new Date(date), 'MMM d')}
                </h2>
                <div className="h-px flex-grow border-t-2 border-dashed border-outline-variant/40"></div>
              </div>
              <div className="space-y-4">
                {items.map(t => (
                  <TransactionItem key={t.id} transaction={t} />
                ))}
              </div>
            </section>
          ))}
        </div>
      </div>
    </motion.div>
  );
}

function StatisticsPage({ transactions, key }: { transactions: Transaction[], key?: React.Key }) {
  const chartData = [
    { name: 'Oct', amount: 1200 },
    { name: 'Nov', amount: 1800 },
    { name: 'Dec', amount: 1400 },
    { name: 'Jan', amount: 2200 },
    { name: 'Feb', amount: 1600 },
    { name: 'Mar', amount: 2000 },
  ];

  const pieData = useMemo(() => {
    const expenses = transactions.filter(t => t.type === 'expense');
    const total = expenses.reduce((acc, t) => acc + t.amount, 0);
    if (total === 0) return [{ name: 'No Expenses', value: 100, color: '#eee' }];

    const categoryTotals: Record<string, number> = {};
    expenses.forEach(t => {
      categoryTotals[t.category] = (categoryTotals[t.category] || 0) + t.amount;
    });

    return Object.entries(categoryTotals).map(([name, value]) => ({
      name,
      value: Math.round((value / total) * 100),
      color: CATEGORIES.find(c => c.name === name)?.color || '#A0A0A0'
    }));
  }, [transactions]);

  const totalSaved = useMemo(() => {
    return transactions.reduce((acc, t) => t.type === 'income' ? acc + t.amount : acc - t.amount, 0);
  }, [transactions]);

  const dailyAvg = useMemo(() => {
    const expenses = transactions.filter(t => t.type === 'expense');
    if (expenses.length === 0) return 0;
    const total = expenses.reduce((acc, t) => acc + t.amount, 0);
    return total / 30; // Rough average over 30 days
  }, [transactions]);

  const topCategory = useMemo(() => {
    const expenses = transactions.filter(t => t.type === 'expense');
    if (expenses.length === 0) return { name: 'None', amount: 0 };
    const categoryTotals: Record<string, number> = {};
    expenses.forEach(t => {
      categoryTotals[t.category] = (categoryTotals[t.category] || 0) + t.amount;
    });
    const top = Object.entries(categoryTotals).sort((a, b) => b[1] - a[1])[0];
    return { name: top[0], amount: top[1] };
  }, [transactions]);

  return (
    <motion.div 
      initial={{ opacity: 0, scale: 0.95 }}
      animate={{ opacity: 1, scale: 1 }}
      exit={{ opacity: 0, scale: 0.95 }}
      className="space-y-12"
    >
      <header className="rotate-[-0.5deg]">
        <h2 className="font-headline font-extrabold text-4xl md:text-5xl text-on-background tracking-tight mb-2 relative inline-block">
          Monthly Insights
          <div className="absolute -bottom-2 left-0 w-full h-3 bg-primary/10 rounded-full"></div>
        </h2>
        <p className="font-handwritten text-primary-dim text-2xl mt-4">"Analyzing the ink drops of your spending."</p>
      </header>

      <div className="grid grid-cols-1 md:grid-cols-12 gap-8 items-start">
        <div className="md:col-span-8 bg-white p-8 sketchy-card rotate-[-0.5deg] shadow-lg relative">
          <div className="absolute -top-3 left-1/2 -translate-x-1/2 w-32 h-6 bg-primary/20 rounded-full rotate-1"></div>
          <h3 className="font-headline font-bold text-xl mb-10 flex items-center gap-2">
            <Pencil size={20} className="text-primary" />
            Spending Fluctuations
          </h3>
          <div className="h-64">
            <ResponsiveContainer width="100%" height="100%">
              <LineChart data={chartData}>
                <CartesianGrid strokeDasharray="3 3" vertical={false} stroke="#eee" />
                <XAxis dataKey="name" axisLine={false} tickLine={false} tick={{ fontStyle: 'italic', fill: '#666' }} />
                <YAxis hide />
                <Tooltip 
                  contentStyle={{ borderRadius: '1rem', border: '2px solid #f1eba6', boxShadow: 'none' }}
                  itemStyle={{ fontWeight: 'bold' }}
                />
                <Line 
                  type="monotone" 
                  dataKey="amount" 
                  stroke="#95523d" 
                  strokeWidth={4} 
                  dot={{ r: 6, fill: '#95523d', strokeWidth: 2, stroke: '#fff' }}
                  activeDot={{ r: 8 }}
                />
              </LineChart>
            </ResponsiveContainer>
          </div>
        </div>

        <div className="md:col-span-4 bg-surface-container-high p-8 sketchy-card rotate-3 shadow-xl flex flex-col items-center text-center border-2 border-primary/20 group">
          <div className="absolute -top-4 -right-4 w-20 h-20 bg-primary/10 rounded-full flex items-center justify-center border-2 border-dashed border-primary rotate-12 group-hover:rotate-45 transition-transform">
            <span className="font-handwritten text-primary font-bold">MVP!</span>
          </div>
          <Utensils size={64} className="text-primary-dim mb-4" />
          <h3 className="font-headline font-bold text-2xl mb-1 text-on-surface">{topCategory.name}</h3>
          <p className="font-handwritten text-4xl text-primary mb-6">${topCategory.amount.toFixed(2)}</p>
          <div className="w-full bg-white/40 p-4 rounded-xl italic text-sm leading-relaxed border-2 border-dashed border-primary/20">
            "Your inner foodie is thriving, Alex. Maybe explore the kitchen more next week? 🍳"
          </div>
        </div>

        <div className="md:col-span-6 bg-white p-10 sketchy-card rotate-[-1deg] shadow-lg flex flex-col md:flex-row items-center gap-12 overflow-hidden">
          <div className="relative w-52 h-52 flex-shrink-0">
            <ResponsiveContainer width="100%" height="100%">
              <PieChart>
                <Pie
                  data={pieData}
                  cx="50%"
                  cy="50%"
                  innerRadius={60}
                  outerRadius={80}
                  paddingAngle={5}
                  dataKey="value"
                  stroke="none"
                >
                  {pieData.map((entry, index) => (
                    <Cell key={`cell-${index}`} fill={entry.color} />
                  ))}
                </Pie>
              </PieChart>
            </ResponsiveContainer>
            <div className="absolute inset-0 flex items-center justify-center font-handwritten text-2xl text-on-surface opacity-40">
              Split
            </div>
          </div>
          <div className="flex-grow space-y-4">
            <h3 className="font-headline font-bold text-xl mb-4 border-b-2 border-dashed border-outline-variant/30 pb-2">Journal Stats</h3>
            {pieData.map(d => (
              <div key={d.name} className="flex items-center gap-4">
                <div className="w-4 h-4 rounded-full" style={{ backgroundColor: d.color }}></div>
                <span className="text-sm font-semibold">{d.name}</span>
                <span className="ml-auto font-handwritten text-xl">{d.value}%</span>
              </div>
            ))}
          </div>
        </div>

        <div className="md:col-span-6 grid grid-cols-2 gap-6 h-full">
          <div className="bg-surface-container-low p-6 sketchy-card rotate-1 shadow-sm">
            <p className="text-[10px] uppercase tracking-widest font-bold text-outline mb-1">Total Balance</p>
            <p className="text-3xl font-black text-on-surface">${totalSaved.toFixed(2)}</p>
            <div className="mt-4 font-handwritten text-primary text-lg">+12% vs last month! ✨</div>
          </div>
          <div className="bg-white p-6 sketchy-card rotate-[-2deg] shadow-md">
            <p className="text-[10px] uppercase tracking-widest font-bold text-outline mb-1">Daily Avg</p>
            <p className="text-3xl font-black text-on-surface">${dailyAvg.toFixed(2)}</p>
            <div className="mt-4 font-handwritten text-secondary-dim text-lg">Right on track...</div>
          </div>
          <div className="col-span-2 bg-secondary-container/20 p-6 sketchy-card flex items-center justify-between border-2 border-dashed border-secondary-dim/30">
            <div className="flex items-center gap-5">
              <div className="p-3 bg-secondary-container rounded-full rotate-6 shadow-inner border border-secondary-dim/10">
                <Sparkles className="text-secondary" />
              </div>
              <div>
                <p className="font-bold text-base text-on-secondary-container">Vacation Fund</p>
                <div className="flex items-center gap-3 mt-1">
                  <div className="w-32 h-2 bg-secondary-dim/10 rounded-full overflow-hidden">
                    <div className="w-[85%] h-full bg-secondary rounded-full"></div>
                  </div>
                  <p className="font-handwritten text-lg text-secondary">85%</p>
                </div>
              </div>
            </div>
            <button className="bg-primary text-white font-handwritten text-xl px-6 py-2 sketchy-card shadow-lg hover:scale-105 transition-all">
              Add more!
            </button>
          </div>
        </div>
      </div>

      <div className="torn-paper px-12 py-10 rotate-1 max-w-2xl mx-auto text-center shadow-2xl relative">
        <div className="absolute -top-4 left-1/2 -translate-x-1/2 w-8 h-8 bg-red-400 rounded-full shadow-inner border-4 border-red-500/20"></div>
        <p className="font-handwritten text-4xl text-on-surface mb-4 tracking-tight">Beautifully saved!</p>
        <p className="font-handwritten text-2xl text-on-surface-variant leading-relaxed">
          "Based on your patterns, you're projected to have an extra <span className="font-black text-primary underline decoration-wavy decoration-primary-fixed-dim/50 underline-offset-4">$210</span> by month-end. Maybe treat yourself to that book you've been eyeing? 🌿"
        </p>
      </div>
    </motion.div>
  );
}
