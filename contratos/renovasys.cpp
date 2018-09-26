    /**
     *  @file
     *  @copyright defined in eos/LICENSE.txt
     */
    #include <eosiolib/eosio.hpp>
    #include <eosiolib/action.hpp>
    #include <eosiolib/contract.hpp>
    #include <eosiolib/symbol.hpp>
    #include <eosiolib/asset.hpp>

#include <rnvuser.cpp>
#include <rnvvoucher.cpp>
#include <rnvaccount.cpp>
#include <rnvoffer.cpp>
#include <rnvboostprice.cpp>
#include <rnvmaterial.cpp>

    #include <string>

    using std::string;
    using eosio::asset;
    using eosio::indexed_by;
    using eosio::const_mem_fun;
    using eosio::print;

    class rnvsys : public eosio::contract {
        
    
    public:
        explicit rnvsys(action_name self) : contract(self) {
        }

        //@abi action
        void adduser(const account_name account,
                    const string& gov_id,
                    const string& user_data,
                    uint32_t type,
                    uint32_t status) 
        {
            require_auth(account); // make sure authorized by account

            rnvuser _rnvuser(_self);
            _rnvuser.adduser(account, gov_id, user_data, type, status);

        }


        //@abi action
        void updateuser(const account_name account,
                        const string& user_data)
        {

            require_auth(account); // make sure authorized by account

            rnvuser _rnvuser(_self);
            _rnvuser.updateuser(account, user_data);
        }

        //@abi action
        void changeuserst(const account_name account,
                            uint32_t type, uint32_t status)
        {

            require_auth(account); // make sure authorized by account

            rnvuser _rnvuser(_self);
            _rnvuser.changeuserst(account, type, status);
        }

        //@abi action
        void removeuser(const account_name account)
       
        {

            require_auth(account); // make sure authorized by account

            rnvuser _rnvuser(_self);
            _rnvuser.removeuser(account);

        }

        //@abi action
        void addoffer(const account_name account,
                        uint64_t userId,
                        uint64_t offer_value,
                        const string& offer_data)

        {
            require_auth(account); // make sure authorized by account

            rnvoffer _rnvoffer(_self);
            _rnvoffer.addoffer(account, userId, offer_value, offer_data);
        }


        //@abi action
        void updateoffer(const account_name account,
                        uint64_t offerId,
                        uint64_t offer_value,
                        const string& offer_data)
        {

            require_auth(account); // make sure authorized by account

            rnvoffer _rnvoffer(_self);
            _rnvoffer.updateoffer(account, offerId, offer_value, offer_data);

        }

        //@abi action
        void removeoffer(const account_name account,
                        uint64_t offerId)
        {
            require_auth(account); // make sure authorized by account

            rnvoffer _rnvoffer(_self);
            _rnvoffer.removeoffer(account, offerId);
        }

        
        //@abi action
        void setbprice(const account_name account,
                        uint64_t value)
        {
            require_auth(_self); // make sure authorized by account

            rnvboostprice _rnvboostprice(_self);
            _rnvboostprice.setbprice(account, value);
            
        }

        //@abi action
        void payforboost(const account_name account,
                        uint64_t offerId)

        {
            require_auth(account); // make sure authorized by account

            rnvboostprice _rnvboostprice(_self);
            _rnvboostprice.payforboost(account, offerId);
            
        }

        //@abi action
        void addmaterial(const account_name account,
                        uint64_t userId,
                        uint64_t materialUnd,
                        uint64_t quote_price,
                        const string& material_description)

        {
            require_auth(account); // make sure authorized by account

            rnvmaterial _rnvmaterial(_self);
            _rnvmaterial.addmaterial(account, userId, materialUnd, quote_price, material_description);

        }
        
        //@abi action
        void updatemat(const account_name account,
                            uint64_t materialId,
                            uint64_t materialUnd,
                            uint64_t quote_price,
                            const string& material_description)

        {
            require_auth(account); // make sure authorized by account

            rnvmaterial _rnvmaterial(_self);
            _rnvmaterial.updatemat(account, materialId, materialUnd, quote_price, material_description);

        }

        //@abi action
        void removemat(const account_name account,
                        uint64_t materialId)

        {
            require_auth(account); // make sure authorized by account

            rnvmaterial _rnvmaterial(_self);
            _rnvmaterial.removemat(account, materialId);

        }

        //@abi action
        void payformat( const account_name account,
                        const account_name receiver,
                        uint64_t userId,
                        uint64_t value_material)

        {
            // pay a token amount to a person who has delivered material for recycling
            require_auth(account); // make sure authorized by account

            rnvmaterial _rnvmaterial(_self);
            _rnvmaterial.payformat(account, receiver, userId, value_material);
            
        }

        //@abi action
        void payforoffer(const account_name account,
                        const account_name merchant,
                        uint64_t offerId)

        {
            // pay a token amount to a person who has delivered material for recycling
            require_auth(account); // make sure authorized by account

            rnvoffer _rnvoffer(_self);
            _rnvoffer.payforoffer(account, merchant, offerId);
        }

        //@abi action
        void redeemvouche( const account_name voucher_owner, const account_name voucher_issuer, uint64_t voucherId){

            require_auth(voucher_owner); // make sure authorized by account

            rnvvoucher _rnvvoucher(_self);
            _rnvvoucher.redeemvouche(voucher_owner, voucher_issuer, voucherId);
            
        }

    private:


    };
    EOSIO_ABI( rnvsys,(adduser)(updateuser)(changeuserst)(removeuser)(addoffer)(updateoffer)(removeoffer)(setbprice)(payforboost)(addmaterial)(updatemat)(removemat)(payformat)(payforoffer)(redeemvouche));