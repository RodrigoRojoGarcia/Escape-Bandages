package es.sidelab.EscapeBandages;

public class Client {

		private long id;
		private int timeOfInactivity = 0;
		private User user;
		public Client() {
			
		}
		public Client(long id) {
			this.id = id;
		}
		
		public long getId() {
			return this.id;
		}
		public void setId(long id) {
			this.id = id;
		}
		public void increaseInactivty() {
			this.timeOfInactivity++;
		}
		public int getTimeOfInactivity() {
			return this.timeOfInactivity;
		}
		public void resetInactivity() {
			this.timeOfInactivity = 0;
		}
		public User getUser() {
			return this.user;
		}
		public void setUser(User user) {
			this.user = user;
		}
}
