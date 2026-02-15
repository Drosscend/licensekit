import type { LicenseMetadata } from "@/types/license";

import agpl30 from "./agpl-3.0.json";
import apache20 from "./apache-2.0.json";
import bsd2Clause from "./bsd-2-clause.json";
import bsd3Clause from "./bsd-3-clause.json";
import bsl10 from "./bsl-1.0.json";
import cc01 from "./cc0-1.0.json";
import epl20 from "./epl-2.0.json";
import gpl20 from "./gpl-2.0.json";
import gpl30 from "./gpl-3.0.json";
import isc from "./isc.json";
import lgpl30 from "./lgpl-3.0.json";
import mit from "./mit.json";
import mpl20 from "./mpl-2.0.json";
import unlicense from "./unlicense.json";

/** All bundled licenses as a typed array. */
export const LICENSES: LicenseMetadata[] = [
	mit,
	apache20,
	gpl30,
	gpl20,
	agpl30,
	lgpl30,
	mpl20,
	bsd2Clause,
	bsd3Clause,
	isc,
	unlicense,
	cc01,
	bsl10,
	epl20,
] as LicenseMetadata[];

/** Map of all bundled licenses keyed by spdxId. */
export const LICENSE_MAP: Map<string, LicenseMetadata> = new Map(
	LICENSES.map((l) => [l.spdxId, l]),
);

/** Array of all bundled license spdx identifiers. */
export const LICENSE_KEYS: string[] = LICENSES.map((l) => l.spdxId);
