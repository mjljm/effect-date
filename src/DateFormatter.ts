import { MBadArgumentError, MEither, MOption } from "#mjljm/effect-lib";
import * as Date from "#src/Date";
import * as Token from "#src/Token";
import * as Templater from "@mjljm/effect-templater";
import { Either, Function, Option, pipe } from "effect";
import { apply, compose } from "effect/Function";

const moduleTag = "@mjljm/effect-date/DateFormatter/";

export interface Type {
	readonly dateTemplater: Templater.Type;
}

export const make = (format: string): Either.Either<Type, unknown> =>
	Either.gen(function* () {
		const dateTemplater = Templater.make(format, Token.tokens);

		return { dateTemplater };
	});
apply;
export const read = (
	self: Type,
	locale?: string,
): ((dateToRead: string) => Either.Either<Date.Type, unknown>) =>
	Either.gen(function* () {
		const tokenToMergedTokensForLocale = yield* pipe(
			Token.tokenToMergedTokens,
			Array.map(Function.apply(locale)),
			Either.all,
			Either.mapLeft(
				MBadArgumentError.setModuleTagAndFunctionName(moduleTag, "read"),
			),
			Either.map(
				Array.map(
					compose(
						Either.mapLeft(
							MBadArgumentError.setModuleTagAndFunctionName(moduleTag, "read"),
						),
					),
				),
			),
		);
		return (dateToRead: string) =>
			Either.gen(function* () {
				const tokenValues = yield* pipe(
					dateToRead,
					Templater.read(self.dateTemplater, Token.tokenPatterns),
					Either.mapLeft(
						MBadArgumentError.setModuleTagAndFunctionName(moduleTag, "read"),
					),
					MEither.catchTag(
						"Effect-lib_BadArgument_BadFormat",
						MBadArgumentError.mapId(() => "dateToRead"),
					),
				);
				const mergedTokenValues = yield* pipe(
					tokenValues,
					Array.zip(tokenToMergedTokensForLocale),
					Array.map(([tokenValue, tokenToMergedTokenForLocale]) =>
						pipe(
							tokenValue,
							Option.map(tokenToMergedTokenForLocale),
							MOption.traverseEither,
						),
					),
					Either.all,
				);
			}) as never;
	}) as never;
