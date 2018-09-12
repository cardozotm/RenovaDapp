/**
 *  @file
 *  @copyright defined in eos/LICENSE.txt
 */
#include <eosiolib/eosio.hpp>
#include <eosiolib/action.hpp>
#include <eosiolib/contract.hpp>
#include <eosiolib/print.hpp>
#include <string>

using eosio::indexed_by;
using eosio::const_mem_fun;
using std::string;

struct hi {
    account_name account;
};

class renova : public eosio::contract {
   public:
      explicit renova(action_name self)
              : contract(self), _user(self, self), _offer(self, self), _material(self, self) {
      }

      //@abi action
      void addUser(  const account_name account,
                 const string& gov_id,
                 const string& user_data,
                 uint32_t type,
                 uint32_t status) {

          // if not authorized then this action is aborted and transaction is rolled back
          // any modifications by other actions are undone
          require_auth(account); // make sure authorized by account

          // address_index is typedef of our multi_index over table address
          // address table is auto "created" if needed
          usertable users(_self, _self); // code, scope

          // verify does not already exist
          // multi_index find on primary index which in our case is account
          auto itr = users.find(account);
          eosio_assert(itr == users.end(), "user for account already exists");

          // add to table, first argument is account to bill for storage
          // each entry will be pilled to the associated account
          // we could have instead chosen to bill _self for all the storage
          users.emplace(account /*payer*/, [&](auto& user) {
            user.userId = users.available_primary_key();
            user.account_name = account;
            user.gov_id = gov_id; //Gov ID MD5
            user.user_data = user_data;
            user.type = type;     // 0 = consumer, 1 = merchant , 2 = recycling center
            user.status = status; // 1 for active users, 0 for inactive user

          });

          eosio::action(
                  std::vector<eosio::permission_level>(1,{_self, N(active)}),
                  N(hello), N(hi), hi{account} ).send();
      }

        //@abi action
    void updateUser(const account_name account,
                    const string& user_data)
    {

        require_auth(account); // make sure authorized by account

        usertable users(_self, _self); // code - account that has permission, scope - account that store the data

        // verify already exist
        auto itr = users.find(account);
        eosio_assert(itr != users.end(), "users for account not found");

        users.modify(itr, account /*payer*/, [&](auto &user) {
            user.account_name = account;
            user.user_data = user_data;
        });
    }

    //@abi action
    void changeUserStatus(const account_name account,
                          uint32_t type, uint32_t status)
    {

        require_auth(account); // make sure authorized by account

        usertable users(_self, _self); // code, scope

        // verify already exist
        auto itr = users.find(account);
        eosio_assert(itr != users.end(), "users for account not found");

        users.modify(itr, account /*payer*/, [&](auto &user) {
            user.type = type;     // 0 = nom employee, 1 = partners or providers , 2 = employee
            user.status = status; // 1 for active users, 0 for inactive user
        });
    }

    //@abi action
    void removeUser(const account_name account)
    {

        require_auth(account); // make sure authorized by account

        usertable users(_self, _self); // code, scope

        // verify already exist
        auto itr = users.find(account);
        eosio_assert(itr != users.end(), "users for account not found");

        users.erase(itr);
    }

    //@abi action
    void addOffer(const account_name account,
                    uint64_t userId,
                    const string& offer_data)

    {
        require_auth(account); // make sure authorized by account

        usertable users(_self, _self); /// code, scope

          // is the users open
        for (auto& item : users)
        {
            if (item.userId == userId)
            {
                // can only add if the type and status macht to active 1, merchant 1
                if (item.type == 1 && item.status == 1)
                {
                    _offer.emplace(get_self(), [&](auto &offer) {
                        offer.offerId = users.available_primary_key();
                        offer.account_name = account;
                        offer.userId = userId;
                        offer.offer_data = offer_data;
                    });
                }
                else
                {
                    // print("Can not add a new offer, user is deactivated or is not a merchant");
                }

                break; // so you only add it once
            }
        }
    }

   private:
    
   //@abi table user i64
   struct user
    {
        uint64_t userId;
        uint64_t account_name;
        string   gov_id;
        string   user_data;
        uint32_t type;
        uint32_t status;

        uint64_t primary_key() const { return account_name; }
        uint64_t by_userId() const {return userId; }


        EOSLIB_SERIALIZE(user, (userId)(account_name)(user_data)(type)(status))
    };

    typedef eosio::multi_index< N(user), user,
         indexed_by< N(userId), const_mem_fun<user, uint64_t, &user::by_userId> >
      > usertable;

    //@abi table offer i64
    struct offer
    {
        uint64_t offerId;
        uint64_t account_name;
        uint64_t userId;
        string   offer_data;

        uint64_t primary_key() const { return account_name; }
        uint64_t by_offerId() const {return offerId; }


        EOSLIB_SERIALIZE(offer, (offerId)(userId)(offer_data))
    };

    typedef eosio::multi_index< N(offer), offer,
         indexed_by< N(offerId), const_mem_fun<offer, uint64_t, &offer::by_offerId> >
      > offertable;

    //@abi table materials i64
    struct materials
    {
        uint64_t materialId;
        uint64_t userId;
        uint64_t materialUnd;
        uint64_t quote_price;
        string material_description;

        uint64_t primary_key() const { return materialId; }
        uint64_t by_materialId() const {return materialId; }


        EOSLIB_SERIALIZE(materials, (materialId)(userId)(materialUnd)(quote_price)(material_description))
    };

    typedef eosio::multi_index< N(materials), materials,
         indexed_by< N(materialId), const_mem_fun<materials, uint64_t, &materials::by_materialId> >
      > materialtable;     

      // local instances of the multi indexes
      usertable _user;
      offertable _offer;
      materialtable _material;


};

EOSIO_ABI( renova, (addUser)(updateUser)(changeUserStatus)(removeUser))