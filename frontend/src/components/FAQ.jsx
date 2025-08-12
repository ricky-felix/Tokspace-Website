"use client";

import {
	Accordion,
	AccordionContent,
	AccordionItem,
	AccordionTrigger,
} from "@relume_io/relume-ui";
// import { Card } from "@relume_io/relume-ui";
import React from "react";
// import { Add } from "@relume_io/relume-ui";
import { CiSquarePlus } from "react-icons/ci";
import { useTranslation } from "react-i18next";

export function FAQ() {
	const { t } = useTranslation();

	return (
		<section className="px-[5%] py-16 md:py-24 lg:py-28">
			<div className="container max-w-lg">
				<div className="md:mb-18 mb-12 text-center lg:mb-20">
					<h2 className="text-3xl font-bold md:text-4xl lg:text-5xl mb-5 md:mb-6">{t('faq.title')}</h2>
					<p className="text-base md:text-lg lg:text-xl">
						{t('faq.subtitle')}
					</p>
				</div>
				<Accordion
					type="multiple"
					className="grid items-start justify-stretch gap-4"
				>
					<div>
						<AccordionItem
							value="item-0"
							className="border-none px-5 md:px-6 bg-[#E9EDF1]"
						>
							<AccordionTrigger
								icon={
									<CiSquarePlus className="text-scheme-text size-7 shrink-0 transition-transform duration-300 md:size-8" />
								}
								className="text-base md:text-lg lg:text-xl font-medium md:py-5 [&[data-state=open]>svg]:rotate-45"
							>
								{t('faq.question1')}
							</AccordionTrigger>
							<AccordionContent className="md:pb-6">
								<p className="text-base md:text-lg lg:text-xl">
									{t('faq.answer1')}
								</p>
							</AccordionContent>
						</AccordionItem>
					</div>
					<div>
						<AccordionItem
							value="item-1"
							className="border-none px-5 md:px-6 bg-[#E9EDF1]"
						>
							<AccordionTrigger
								icon={
									<CiSquarePlus className="text-scheme-text size-7 shrink-0 transition-transform duration-300 md:size-8" />
								}
								className="text-base md:text-lg lg:text-xl font-medium md:py-5 [&[data-state=open]>svg]:rotate-45"
							>
								{t('faq.question2')}
							</AccordionTrigger>
							<AccordionContent className="md:pb-6">
								<p className="text-base md:text-lg lg:text-xl">
									{t('faq.answer2')}
								</p>
							</AccordionContent>
						</AccordionItem>
					</div>
					<div>
						<AccordionItem
							value="item-2"
							className="border-none px-5 md:px-6 bg-[#E9EDF1]"
						>
							<AccordionTrigger
								icon={
									<CiSquarePlus className="text-scheme-text size-7 shrink-0 transition-transform duration-300 md:size-8" />
								}
								className="text-base md:text-lg lg:text-xl font-medium md:py-5 [&[data-state=open]>svg]:rotate-45"
							>
								{t('faq.question3')}
							</AccordionTrigger>
							<AccordionContent className="md:pb-6">
								<p className="text-base md:text-lg lg:text-xl">
									{t('faq.answer3')}
								</p>
							</AccordionContent>
						</AccordionItem>
					</div>
					<div>
						<AccordionItem
							value="item-3"
							className="border-none px-5 md:px-6 bg-[#E9EDF1]"
						>
							<AccordionTrigger
								icon={
									<CiSquarePlus className="text-scheme-text size-7 shrink-0 transition-transform duration-300 md:size-8" />
								}
								className="text-base md:text-lg lg:text-xl font-medium md:py-5 [&[data-state=open]>svg]:rotate-45"
							>
								{t('faq.question4')}
							</AccordionTrigger>
							<AccordionContent className="md:pb-6">
								<p className="text-base md:text-lg lg:text-xl">
									{t('faq.answer4')}
								</p>
							</AccordionContent>
						</AccordionItem>
					</div>
					<div>
						<AccordionItem
							value="item-4"
							className="border-none px-5 md:px-6 bg-[#E9EDF1]"
						>
							<AccordionTrigger
								icon={
									<CiSquarePlus className="text-scheme-text size-7 shrink-0 transition-transform duration-300 md:size-8" />
								}
								className="text-base md:text-lg lg:text-xl font-medium md:py-5 [&[data-state=open]>svg]:rotate-45"
							>
								{t('faq.question5')}
							</AccordionTrigger>
							<AccordionContent className="md:pb-6">
								<p className="text-base md:text-lg lg:text-xl">
									{t('faq.answer5')}
								</p>
							</AccordionContent>
						</AccordionItem>
					</div>
				</Accordion>
				<div className="md:mt-18 mx-auto mt-12 max-w-md text-center lg:mt-20" />
			</div>
		</section>
	);
}

export default FAQ;
