export abstract class Helper {

    static string = {
        isEmptyNullOrUndefined: (string: string): boolean => {
            return (
                string === null
                ||
                string === undefined
                ||
                string?.trim().length === 0
            );
        },
        camelCaseToSentence: (phrase: string): string => {
            return phrase.replace(/([A-Z])/g, ' $1').toLowerCase();
        },
        capitaliseFirstLetter: (phrase: string): string => {
            let result: string = "";
            if (phrase) result = phrase.charAt(0).toUpperCase() + phrase.slice(1);
            return result;
        },
        decapitaliseFirstLetter: (phrase: string = ""): string => {
            const firstLetterLowerCase = phrase.charAt(0).toLowerCase()
            const phraseWithoutFirstLetter = phrase.slice(1);
            const result = `${firstLetterLowerCase}${phraseWithoutFirstLetter}`;
            return result;
        },
        toKebabCase: (stringToConvert: string = ""): string => stringToConvert?.replace(/ /g, "-").toLowerCase()
    }

    static date = {
        separateDateTimeString: (date: string): any => {
            interface ISeparatedDateTime {
                day?: string;
                month?: string;
                year?: string;
                hour?: string;
                minute?: string;
                second?: string;
            };
            const result: ISeparatedDateTime = {};
            result.day = date.substring(8, 10);
            result.month = date.substring(5, 7);
            result.year = date.substring(0, 4);
            result.hour = date.substring(11, 13);
            result.minute = date.substring(14, 16);
            return result;
        },
        dateToSimpleDateString: (date: any): string => {
            const dateString: string = `${date}`;
            const separatedString = this.date.separateDateTimeString(dateString);
            return `${separatedString.day}/${separatedString.month}/${separatedString.year}`;
        },
        dateTimeToSimpleDateTimeString: (date: any): string => {
            const dateString: string = `${date}`;
            const separatedString = this.date.separateDateTimeString(dateString);
            return `${separatedString.day}/${separatedString.month}/${separatedString.year} ${separatedString.hour}:${separatedString.minute}`;
        },
        dateToNumber: (date: any): number => {
            const dateString = `${date}`;
            const dateComponents = this.date.separateDateTimeString(dateString);
            const result = Number(dateComponents.year) * 10000 + Number(dateComponents.month) * 100 + Number(dateComponents.day);
            return result;
        },
        hoursInMiliSeconds: (numberOfHours: number):number =>  numberOfHours * 60 * 60 * 1000,
        getTimeDifferenceFromNowInMiliseconds: (savedTimeInMiliseconds: number): number => {
            //this will return negative for historic time and positive for future time
            return savedTimeInMiliseconds - Date.now();
        },
        haveXHoursPassed: (numberOfHours: number, savedTimeInMiliseconds: number) => {
            const hoursInMiliseconds: number = Helper.date.hoursInMiliSeconds(numberOfHours);
            //time difference *-1 because historic time is negative
            const timeDifference: number = -1 * this.date.getTimeDifferenceFromNowInMiliseconds(
                savedTimeInMiliseconds
            );
            if (timeDifference / hoursInMiliseconds > 1) return true;
            return false;
        }
    }

    static url = {
        setUrlStateWithQuery: (queryKey: string, queryValue: string) => {
            const url = new URL(window.location.href);
            url.searchParams.set(queryKey, queryValue);
            window.history.pushState({ path: url.href }, "", url.href);
        },
        clearAllQueriesInState: () => {
            const urlWithoutQueries = window.location.origin + window.location.pathname;
            history.pushState({}, document.title, urlWithoutQueries);
        },
        changeSPARoute: (newRoute: string, queryString?: string) => {

            let route = newRoute;
            if (newRoute[0] !== "/") route = `/${newRoute}`;

            let url = new URL(window.location.href);
            url.pathname = route;
            if (queryString) url.search = new URLSearchParams(queryString).toString();
            else url.search = "";

            const urlString = url.toString();

            history.pushState({} , "", urlString);
            const pushStateEvent = new CustomEvent("pushstate", { detail: { state: route } });
            window.dispatchEvent(pushStateEvent);
        }
    }

    static link = {
        openLinkInNewTab: (linkUrl: string): void => {
            window.open(`${linkUrl}`, "_blank", 'noopener,noreferrer')
        }
    }

    static object = {
        shallowEqual: (objectA: {}, objectB: {}): boolean => {
            if (objectA === objectB) return true;
            if (!objectA || !objectB) return false;

            const keysA = Object.keys(objectA);
            const keysB = Object.keys(objectB);

            if (keysA.length !== keysB.length) return false;

            for (var i = 0; i < keysA.length; i++) {
                const objBDoesntHaveProperty = !objectB.hasOwnProperty(keysA[i]);
                const objAObjBValuesNotEqual = objectA[keysA[i]] !== objectB[keysA[i]];

                if (objBDoesntHaveProperty || objAObjBValuesNotEqual) return false;
            }
            return true;
        },
        deepEqual(objectA: {}, objectB: {}): boolean {
            if (objectA === objectB) return true;

            if (
                typeof objectA !== 'object' ||
                objectA === null ||
                typeof objectB !== 'object' ||
                objectB === null
            ) return false;

            const keysA = Object.keys(objectA);
            const keysB = Object.keys(objectB);

            if (keysA.length !== keysB.length) return false;

            for (const key of keysA) {
                if (
                    !keysB.includes(key) ||
                    !this.deepEqual(objectA[key], objectB[key])
                ) return false;
            }

            return true;
        }
    }
}

