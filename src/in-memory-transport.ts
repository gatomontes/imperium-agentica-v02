import { DirectTransportAdapter } from "./direct-transport.js";

/**
 * Dependency-free reference adapter for the abstract transport port.
 *
 * It carries transport identity and correlation through the existing reference
 * boundary without introducing a concrete network, queue, provider, or store.
 */
export class InMemoryTransportAdapter extends DirectTransportAdapter {}
