"use client";

import { GraduationCap, BookOpenCheck, Award, Sparkles, Languages } from "lucide-react";
import { useLanguage } from "@/lib/i18n/LanguageProvider";
import {
  academicQualifications,
  religiousEducation,
  professionalExperience,
  achievements,
  coreStrengths,
  languages,
} from "@/content/scholar-profile";

export function AboutContent() {
  const { t } = useLanguage();

  return (
    <div className="mx-auto max-w-4xl px-5 py-14 sm:py-20 lg:px-8">
      <div className="text-center">
        <span className="mx-auto flex size-14 items-center justify-center rounded-full border border-[var(--color-moonlight)]/30 bg-white/5 text-[var(--color-moonlight)]">
          <GraduationCap className="size-7" aria-hidden="true" />
        </span>
        <h1 className="mt-5 font-[family-name:var(--font-display)] text-2xl text-[var(--color-starlight)] sm:text-3xl">
          {t("about_title")}
        </h1>
      </div>

      <div className="mt-10 space-y-5 font-[family-name:var(--font-body)] text-[17px] leading-relaxed text-[var(--color-silver)]">
        <p>{t("about_p1")}</p>
        <p>{t("about_p2")}</p>
      </div>

      {/* Academic & religious education */}
      <div className="mt-14 grid gap-10 sm:grid-cols-2">
        <div>
          <h3 className="flex items-center gap-2.5 font-[family-name:var(--font-display)] text-lg text-[var(--color-moonlight)]">
            <GraduationCap className="size-5" aria-hidden="true" />
            {t("about_qualifications")}
          </h3>
          <ul className="mt-5 space-y-4 border-s-2 border-[var(--color-moonlight)]/20 ps-5">
            {academicQualifications.map((item, i) => (
              <li key={i} className="relative">
                <span className="absolute -start-[1.65rem] top-1.5 size-2 rounded-full bg-[var(--color-moonlight)]" />
                <p className="text-sm font-medium text-[var(--color-starlight)]">{item.degree}</p>
                <p className="text-xs text-[var(--color-silver)]/70">
                  {item.institute ? `${item.institute} — ` : ""}
                  {item.year}
                </p>
              </li>
            ))}
          </ul>
        </div>

        <div>
          <h3 className="flex items-center gap-2.5 font-[family-name:var(--font-display)] text-lg text-[var(--color-moonlight)]">
            <BookOpenCheck className="size-5" aria-hidden="true" />
            {t("about_religious_education")}
          </h3>
          <ul className="mt-5 space-y-4 border-s-2 border-[var(--color-moonlight)]/20 ps-5">
            {religiousEducation.map((item, i) => (
              <li key={i} className="relative">
                <span className="absolute -start-[1.65rem] top-1.5 size-2 rounded-full bg-[var(--color-moonlight)]" />
                <p className="text-sm font-medium text-[var(--color-starlight)]">{item.degree}</p>
                <p className="text-xs text-[var(--color-silver)]/70">
                  {item.institute ? `${item.institute} — ` : ""}
                  {item.year}
                </p>
              </li>
            ))}
          </ul>
        </div>
      </div>

      {/* Experience */}
      <div className="mt-14 rounded-3xl border border-white/10 bg-white/[0.03] p-8">
        <h3 className="flex items-center gap-2.5 font-[family-name:var(--font-display)] text-lg text-[var(--color-moonlight)]">
          <Sparkles className="size-5" aria-hidden="true" />
          {t("about_experience")}
        </h3>
        <ul className="mt-5 grid gap-3 sm:grid-cols-2">
          {professionalExperience.map((exp, i) => (
            <li key={i} className="flex gap-2.5 text-sm leading-relaxed text-[var(--color-silver)]">
              <span className="mt-1.5 size-1.5 shrink-0 rounded-full bg-[var(--color-moonlight)]" aria-hidden="true" />
              {exp}
            </li>
          ))}
        </ul>
      </div>

      {/* Achievements */}
      <div className="mt-10">
        <h3 className="flex items-center gap-2.5 font-[family-name:var(--font-display)] text-lg text-[var(--color-moonlight)]">
          <Award className="size-5" aria-hidden="true" />
          {t("about_achievements")}
        </h3>
        <ul className="mt-5 grid gap-3 sm:grid-cols-2">
          {achievements.map((a, i) => (
            <li
              key={i}
              className="rounded-2xl border border-[var(--color-moonlight)]/15 bg-[var(--color-moonlight)]/[0.04] px-4 py-3 text-sm text-[var(--color-starlight)]"
            >
              {a}
            </li>
          ))}
        </ul>
      </div>

      {/* Core strengths */}
      <div className="mt-10">
        <h3 className="font-[family-name:var(--font-display)] text-lg text-[var(--color-moonlight)]">
          {t("about_strengths")}
        </h3>
        <div className="mt-5 flex flex-wrap gap-2.5">
          {coreStrengths.map((s) => (
            <span
              key={s}
              className="rounded-full border border-white/10 bg-white/[0.03] px-4 py-2 text-sm text-[var(--color-silver)]"
            >
              {s}
            </span>
          ))}
        </div>
      </div>

      {/* Languages */}
      <div className="mt-10">
        <h3 className="flex items-center gap-2.5 font-[family-name:var(--font-display)] text-lg text-[var(--color-moonlight)]">
          <Languages className="size-5" aria-hidden="true" />
          {t("about_languages")}
        </h3>
        <div className="mt-5 grid grid-cols-2 gap-3 sm:grid-cols-3">
          {languages.map((lang) => (
            <div
              key={lang.nameEn}
              className="rounded-2xl border border-white/10 bg-white/[0.03] px-4 py-4 text-center"
            >
              <p className="font-[family-name:var(--font-arabic)] text-lg text-[var(--color-moonlight)]">
                {lang.nameNative}
              </p>
              <p className="mt-0.5 text-xs text-[var(--color-silver)]/70">{lang.nameEn}</p>
            </div>
          ))}
        </div>
      </div>

      <p className="mt-14 rounded-2xl border border-white/10 bg-white/[0.03] p-5 text-[15px] leading-relaxed text-[var(--color-silver)]/80">
        {t("about_p3")}
      </p>
    </div>
  );
}
