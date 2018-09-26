/**
     *  @file
     *  @copyright defined in eos/LICENSE.txt
     */
    #include <eosiolib/eosio.hpp>
    #include <eosiolib/action.hpp>
    #include <eosiolib/contract.hpp>
    #include <eosiolib/symbol.hpp>
    #include <eosiolib/asset.hpp>

    #include <string>

    using std::string;
    using eosio::asset;
    using eosio::indexed_by;
    using eosio::const_mem_fun;
    using eosio::print;

    class rnvuser : public eosio::contract {
        
    public:
        explicit rnvuser(action_name self) : contract(self), _user(self, self) {
        }
        
        auto& getUserByAccount(const account_name account) 
        {

            usertable users(_self, _self); /// code, scope

            // verify already exist
            auto itr = users.find(account);
            eosio_assert(itr != users.end(), "user not registered");

            return *itr;

        }

        void adduser(const account_name account,
                    const string& gov_id,
                    const string& user_data,
                    uint32_t type,
                    uint32_t status) 
            {

            // address_index is typedef of our multi_index over table address
            // address table is auto "created" if needed
            usertable users(_self, _self); // code, scope

            // verify does not already exist
            // multi_index find on primary index which in our case is account
            auto itr = users.find(account);
            eosio_assert(itr == users.end(), "user already registered");

            // add to table, first argument is account to bill for storage
            // each entry will be pilled to the associated account
            // we could have instead chosen to bill _self for all the storage
            users.emplace(account /*payer*/, [&](auto& user) {
                user.userId = users.available_primary_key();
                user.account_name = account;
                user.gov_id = gov_id; //Gov ID MD5
                user.create_at = now();
                user.last_updated_at = now();
                user.user_data = user_data;
                user.type = type;     // 0 = consumer, 1 = merchant , 2 = recycling center
                user.status = status; // 1 for active users, 0 for inactive user

            });

            print("user added");
        }

        void updateuser(const account_name account,
                        const string& user_data)
        {

            usertable users(_self, _self); // code - account that has permission, scope - account that store the data

            // verify already exist
            auto itr = users.find(account);
            eosio_assert(itr != users.end(), "users not registered");

            users.modify(itr, account /*payer*/, [&](auto &user) {
                user.user_data = user_data;
                user.last_updated_at = now();
            });

            print("user updated");
        }

        void changeuserst(const account_name account,
                            uint32_t type, uint32_t status)
        {

            usertable users(_self, _self); // code, scope

            // verify already exist
            auto itr = users.find(account);
            eosio_assert(itr != users.end(), "user not registered");

            users.modify(itr, account /*payer*/, [&](auto &user) {
                user.type = type;     // 0 = consumer, 1 = merchant , 2 = recycling center
                user.status = status; // 1 for active users, 0 for inactive user
                user.last_updated_at = now();
            });

            print("type and status was updated");
        }

        void removeuser(const account_name account)
       
        {

            usertable users(_self, _self); // code, scope

            // verify already exist
            auto itr = users.find(account);
            eosio_assert(itr != users.end(), "user not registered");

            users.erase(itr);

            print("user removed");
        }

    private:

        //@abi table user i64
        struct user
        {
            uint64_t userId;
            uint64_t account_name;
            string   gov_id;
            uint32_t create_at;
            uint32_t last_updated_at;
            string   user_data;
            uint32_t type;
            uint32_t status;

            uint64_t primary_key() const { return account_name; }
            uint64_t by_userId() const {return userId; }


            EOSLIB_SERIALIZE(user, (userId)(account_name)(gov_id)(create_at)(last_updated_at)(user_data)(type)(status))
        };

        typedef eosio::multi_index< N(user), user,
            indexed_by< N(userId), const_mem_fun<user, uint64_t, &user::by_userId> >
        > usertable;

        // local instances of the multi indexes
        usertable _user;

    };