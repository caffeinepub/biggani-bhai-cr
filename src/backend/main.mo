import Map "mo:core/Map";
import Nat "mo:core/Nat";
import Iter "mo:core/Iter";
import Order "mo:core/Order";
import Array "mo:core/Array";
import Principal "mo:core/Principal";
import Runtime "mo:core/Runtime";
import AccessControl "authorization/access-control";
import MixinAuthorization "authorization/MixinAuthorization";

actor {
  // Types
  public type UserProfile = {
    name : Text;
  };

  type RestaurantInfo = {
    name : Text;
    address : Text;
    phone : Text;
    email : Text;
    openingHours : Text;
  };

  type MenuItem = {
    id : Nat;
    name : Text;
    description : Text;
    price : Float;
    category : Text;
    imageUrl : Text;
    isAvailable : Bool;
  };

  module MenuItem {
    public func compare(item1 : MenuItem, item2 : MenuItem) : Order.Order {
      Nat.compare(item1.id, item2.id);
    };
  };

  type Reservation = {
    id : Nat;
    customerName : Text;
    phone : Text;
    date : Text;
    time : Text;
    guestCount : Nat;
    notes : Text;
    status : Text;
  };

  module Reservation {
    public func compare(res1 : Reservation, res2 : Reservation) : Order.Order {
      Nat.compare(res1.id, res2.id);
    };
  };

  // State
  let accessControlState = AccessControl.initState();
  include MixinAuthorization(accessControlState);

  var nextMenuItemId = 0;
  var nextReservationId = 0;

  let userProfiles = Map.empty<Principal, UserProfile>();
  let menuItems = Map.empty<Nat, MenuItem>();
  let reservations = Map.empty<Nat, Reservation>();

  var restaurantInfo : RestaurantInfo = {
    name = "Biggani Bhai C&R";
    address = "বৈরাগী বাজার খশির, আব্দুল্লাহপুর";
    phone = "01730564953";
    email = "";
    openingHours = "সকাল ৯টা - রাত ১১টা";
  };

  // Register caller: first caller becomes admin automatically
  public shared ({ caller }) func registerCaller() : async Text {
    let role = AccessControl.register(accessControlState, caller);
    switch (role) {
      case (#admin) { "admin" };
      case (#user) { "user" };
      case (#guest) { "guest" };
    };
  };

  // User Profile Functions
  public query ({ caller }) func getCallerUserProfile() : async ?UserProfile {
    userProfiles.get(caller);
  };

  public query ({ caller }) func getUserProfile(user : Principal) : async ?UserProfile {
    if (caller != user and not AccessControl.isAdmin(accessControlState, caller)) {
      Runtime.trap("Unauthorized");
    };
    userProfiles.get(user);
  };

  public shared ({ caller }) func saveCallerUserProfile(profile : UserProfile) : async () {
    userProfiles.add(caller, profile);
  };

  // Restaurant Info Functions
  public query ({ caller }) func getRestaurantInfo() : async RestaurantInfo {
    restaurantInfo;
  };

  public shared ({ caller }) func updateRestaurantInfo(info : RestaurantInfo) : async () {
    if (not (AccessControl.isAdmin(accessControlState, caller))) {
      Runtime.trap("Unauthorized: Only admins can update restaurant info");
    };
    restaurantInfo := info;
  };

  // Menu Item Functions
  public query ({ caller }) func getMenuItems() : async [MenuItem] {
    menuItems.values().toArray().sort();
  };

  public query ({ caller }) func getMenuItem(id : Nat) : async ?MenuItem {
    menuItems.get(id);
  };

  public shared ({ caller }) func addMenuItem(item : MenuItem) : async Nat {
    if (not (AccessControl.isAdmin(accessControlState, caller))) {
      Runtime.trap("Unauthorized: Only admins can add menu items");
    };
    let id = nextMenuItemId;
    nextMenuItemId += 1;
    let newItem : MenuItem = { item with id };
    menuItems.add(id, newItem);
    id;
  };

  public shared ({ caller }) func updateMenuItem(id : Nat, item : MenuItem) : async () {
    if (not (AccessControl.isAdmin(accessControlState, caller))) {
      Runtime.trap("Unauthorized: Only admins can update menu items");
    };
    if (not menuItems.containsKey(id)) {
      Runtime.trap("Menu item not found");
    };
    let updatedItem : MenuItem = { item with id };
    menuItems.add(id, updatedItem);
  };

  public shared ({ caller }) func deleteMenuItem(id : Nat) : async () {
    if (not (AccessControl.isAdmin(accessControlState, caller))) {
      Runtime.trap("Unauthorized: Only admins can delete menu items");
    };
    if (not menuItems.containsKey(id)) {
      Runtime.trap("Menu item not found");
    };
    menuItems.remove(id);
  };

  // Reservation Functions
  public shared ({ caller }) func createReservation(reservation : Reservation) : async Nat {
    let id = nextReservationId;
    nextReservationId += 1;
    let newReservation : Reservation = {
      reservation with
      id;
      status = "pending";
    };
    reservations.add(id, newReservation);
    id;
  };

  public shared ({ caller }) func updateReservationStatus(id : Nat, status : Text) : async () {
    if (not (AccessControl.isAdmin(accessControlState, caller))) {
      Runtime.trap("Unauthorized: Only admins can update reservation status");
    };
    switch (reservations.get(id)) {
      case (null) { Runtime.trap("Reservation not found") };
      case (?reservation) {
        let updatedReservation : Reservation = { reservation with status };
        reservations.add(id, updatedReservation);
      };
    };
  };

  public query ({ caller }) func getReservations() : async [Reservation] {
    if (not (AccessControl.isAdmin(accessControlState, caller))) {
      Runtime.trap("Unauthorized: Only admins can view reservations");
    };
    reservations.values().toArray().sort();
  };
};
