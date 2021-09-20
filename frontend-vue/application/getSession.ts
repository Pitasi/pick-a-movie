import sessionService from "~/services/sessionService";

async function getSession(id: Uid) {
  return await sessionService.get(id);
}

export default getSession;
