"use client";

import { useId, useState } from "react";
import { CalcInput } from "@/components/tools/CalcInput";
import { ResultReadout } from "@/components/tools/ResultReadout";

function formatMoney(n: number) {
  return n.toLocaleString("ru-RU", { maximumFractionDigits: 0 });
}

export function LoanCalculator() {
  const [amount, setAmount] = useState("300000");
  const [rate, setRate] = useState("12");
  const [months, setMonths] = useState("24");

  const amountId = useId();
  const rateId = useId();
  const monthsId = useId();

  const principal = parseFloat(amount.replace(",", "."));
  const annualRate = parseFloat(rate.replace(",", "."));
  const term = parseInt(months, 10);

  const isValid =
    !Number.isNaN(principal) &&
    principal > 0 &&
    !Number.isNaN(annualRate) &&
    annualRate >= 0 &&
    !Number.isNaN(term) &&
    term > 0;

  let payment: number | null = null;
  let total: number | null = null;
  let overpayment: number | null = null;

  if (isValid) {
    const monthlyRate = annualRate / 100 / 12;
    payment =
      monthlyRate === 0
        ? principal / term
        : (principal * monthlyRate) / (1 - Math.pow(1 + monthlyRate, -term));
    total = payment * term;
    overpayment = total - principal;
  }

  return (
    <div className="rounded-xl border border-line bg-paper p-5">
      <div className="grid grid-cols-1 gap-3 sm:grid-cols-3">
        <CalcInput
          id={amountId}
          label="сумма кредита"
          value={amount}
          onChange={setAmount}
          suffix="₽"
        />
        <CalcInput
          id={rateId}
          label="ставка, годовых"
          value={rate}
          onChange={setRate}
          suffix="%"
        />
        <CalcInput
          id={monthsId}
          label="срок"
          value={months}
          onChange={setMonths}
          suffix="мес."
        />
      </div>

      <div className="mt-3 space-y-2">
        <ResultReadout
          label="платёж в месяц"
          value={payment === null ? "—" : formatMoney(payment)}
        />
        <ResultReadout
          label="переплата"
          value={overpayment === null ? "—" : formatMoney(overpayment)}
        />
        <ResultReadout
          label="выплатите всего"
          value={total === null ? "—" : formatMoney(total)}
        />
      </div>
    </div>
  );
}
