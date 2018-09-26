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

    class rnvvoucher : public eosio::contract {
        
    public:
        explicit rnvvoucher(action_name self) : contract(self), _voucher(self, self) {
        }

        auto& getVoucherByOfferId(const uint64_t offerId) 
        {

            vouchertable voucher(_self, _self); 

            // verify already exist
            auto itr = voucher.find(offerId);
            eosio_assert(itr == voucher.end(), "it's not possible to update an offer that has already been redeemed");

            return *itr;
        }

        void redeemvouche( const account_name voucher_owner, const account_name voucher_issuer, uint64_t voucherId){

            vouchertable voucher(_self, _self); // code, scope

            // verify already exist
            auto itr = voucher.find(voucherId);
            eosio_assert(itr != voucher.end(), "voucherId not found");

            auto& voucherItem = *itr;

            // can only erase a voucher if it exist and actors match
            if (voucherItem.voucher_issuer == voucher_issuer && voucherItem.voucher_owner == voucher_owner)
            {
                voucher.erase(itr);
                print("voucher removed");
            }
            else {
                print("Can not redeem this voucheeId");
            }
            
        }

        void createvoucher( const account_name voucher_issuer, 
                            const account_name voucher_owner,
                            uint64_t offerId)
        {
            auto id = _voucher.available_primary_key();
            
             _voucher.emplace(get_self(), [&](auto &voucher) {
                voucher.voucherId = id;
                voucher.offerId = offerId;
                voucher.voucher_issuer = voucher_issuer;
                voucher.voucher_owner = voucher_owner;
                voucher.buy_date = now();
            });
            print("Your voucherId is: ");
            print(id);

        }
        
    private:

        //@abi voucher offer i64
        struct voucher
        {
            uint64_t voucher_issuer;
            uint64_t voucher_owner;
            uint64_t voucherId;
            uint64_t offerId;
            uint64_t buy_date;

            uint64_t primary_key() const { return voucherId; }
            uint64_t by_voucherId() const {return offerId; }


            EOSLIB_SERIALIZE(voucher, (voucher_issuer)(voucher_owner)(voucherId)(offerId)(buy_date))

        };

        typedef eosio::multi_index<N(voucher), voucher> vouchertable;

        // local instances of the multi indexes
        vouchertable _voucher;        

    };